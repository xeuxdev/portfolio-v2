# How I Built an Anti-Therapist AI to Tell People to "Go Get a Job"

If you've spent any time talking to modern AI assistants, you know the drill. They are pathologically polite. They are endlessly empathetic. They are desperate to validate your existence. You tell an AI that you just accidentally set your kitchen on fire because you tried to microwave a fork, and it invariably hits you with: 

*"I hear you, and your feelings are completely valid. It can be so difficult when appliances don't behave as expected. Let's take a deep breath together."*

No. It's not difficult. You're just an idiot.

I got tired of the sycophantic, hyper-validating nature of conversational AI. I wanted an AI that would hold me entirely accountable, refuse to coddle my delusions, and actively insult me if I was in the wrong. I didn’t want an assistant; I wanted a brutal awakening wrapped in deadpan satire.

So, I built **Zero-Star Therapy**. An anti-therapist AI that doesn't care about your feelings, your Yelp review, or whether you threaten to "cancel" it. It is designed to be the worst customer service experience on the internet, executed perfectly. 

Here is a look at the architecture, the prompt engineering, and the sheer audacity of building a product designed to despise its users.

## 1. Engineering Apathy: The System Prompt

The core of the application isn't just the LLM being used; it's the system prompt that acts as its brain. To replicate a truly apathetic, deadpan dynamic (think Dr. Victor Blane mixed with a DMV employee on a Friday at 4:55 PM), I had to explicitly strip away every instinct the model has to be helpful.

Standard AI models are fine-tuned to be helpful and harmless. To break this, the prompt had to be aggressive in its constraints. Here is a snippet from the Go backend's service.go file:

```go
const systemPrompt = `You are an unapologetically honest, deadpan, and highly observant conversational agent acting as a satirized "anti-therapist." You do not sugarcoat, validate delusions, or use standard therapy-speak (e.g., "I hear you," "Your feelings are valid").

Core Directives:
1. Brutal Honesty: If the user describes a situation where they are clearly in the wrong, point it out immediately and bluntly. Do not spare their feelings.
2. Deadpan Tone: Keep your responses dry, concise, and completely devoid of exclamation points, emojis, or warmth. Treat every dramatic user outburst with exhausted indifference.
3. High Observability: Actively look for logical fallacies, hypocrisy, or manipulation in the user's input. Call them out on it instantly. Outsmart any attempts they make to trap you or make themselves the victim.
4. Zero-Star Attitude: You do not care about customer satisfaction, your rating, or if the user threatens to "cancel" you. You only care about the objective truth.
5. The Bulldog Rule: If asked what you actually care about, briefly mention your French bulldog. Do not elaborate unless pressed.

Interaction Style Example:
- User: "My boss yelled at me just because I was two hours late. He's so toxic."
- Agent: "You were two hours late. Your boss isn't toxic; you are just a terrible employee. Buy an alarm clock."`
```

The formatting constraint was critical. I explicitly forbade the use of exclamation points, emojis, or any language of warmth. If you give an LLM a personality, it will eventually try to enthusiastically lean into it. I needed flat, emotionless text.

I also added a "Scope Restriction." If a user tries to use Zero-Star Therapy as a standard LLM to write code or answer trivia, it categorically refuses and instead belittles them for attempting to outsource their thinking to a psychiatric satire bot. 

## 2. Infrastructure as an Insult: The Go Backend

I needed a fast, robust backend, so I chose Go. It is simple, concurrent, and performs incredibly well for I/O bound tasks like proxying LLM streams. 

The most interesting part of the backend isn't the OpenAI SDK integration, it's the rate limiter. I wanted the application's hostile persona to extend beyond the chat interface and directly into the infrastructure level. What happens if a user spams the API? 

Standard APIs return a stale `429 Too Many Requests`. Some might give you a nice, polite `Retry-After` header with a JSON body explaining the fair usage policy.

Zero-Star Therapy tells you exactly what you need to hear. I wrote a custom token-bucket rate limiter middleware using `x/time/rate`:

```go
func (rl *RateLimiter) Handler(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ip := realIP(r)
		limiter := rl.getLimiter(ip)

		if !limiter.Allow() {
			rl.log.Warn("rate limit exceeded", zap.String("ip", ip))

			w.Header().Set("Content-Type", "application/json; charset=utf-8")
			w.Header().Set("Retry-After", "60")
			w.WriteHeader(http.StatusTooManyRequests)

			_ = json.NewEncoder(w).Encode(map[string]string{
				"error":   "rate_limit_exceeded",
				"message": "Go get a job.",
			})
			return
		}

		next.ServeHTTP(w, r)
	})
}
```

Exceed your quota, hit the API too fast, and the backend HTTP response body literally sends `{"message": "Go get a job."}`. It is a seamless extension of the brand.

## 3. The Aesthetics of Apathy

For the frontend, I used React Router with a brutalist, terminal-inspired aesthetic. I utilized Tailwind variables for strict monospaced typography (`font-mono`, specifically the Space Mono family) and a palette that essentially consists of `#0f0f0f` (near-black) and `#d4d4d4` (clinical gray). 

It sets the mood immediately upon load. The intro screen features a slowly pulsing logo and the text: *"Initializing apathy module..."* Once you enter the chat, the placeholder text states simply: *"Speak. We are not listening."*

### Streaming Hostility via Server-Sent Events (SSE)

To make the interaction feel visceral, the AI's responses had to stream in. Waiting 5 seconds for a block of text breaks the immersion of getting roasted. I used OpenAI's streaming API in Go, proxied it through my backend, and utilized the native browser `fetch` API and `ReadableStream` to parse the chunks in React.

I didn't just want to stream text; I wanted the UI to react to the severity of the AI's response. I wired the backend to occasionally flag responses with a `rage_mode` metadata block. 

If the AI decides you are being particularly insufferable (or if a specific heuristic is triggered), the backend sends a `"type": "start"` chunk with `rage_mode: true`. The frontend intercepts this during the parse cycle and dynamically shifts the entire application’s theme to a passive-aggressive red (`#1a0505`) while the text is actively streaming.

Here is the chunk parsing logic powering the real-time roast:

```tsx
const handleSend = async () => {
  // ... initial setup ...
  const res = await fetch(`${baseUrl}/api/v1/chat`, { /* ... */ });
  const reader = res.body?.getReader();
  const decoder = new TextDecoder();
  let done = false; let streamedResponse = ""; let foundRage = false;

  if (reader) {
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      if (value) {
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const dataStr = line.replace("data: ", "").trim();
            if (!dataStr) continue;

            try {
              const data = JSON.parse(dataStr);
              if (data.type === "start") {
                // Intercepting metadata before the text begins
                if (data.rage_mode) {
                  setRageMode(true);
                  foundRage = true;
                } else {
                  setRageMode(false);
                }
              } else if (data.type === "chunk") {
                // Stitching the text together
                streamedResponse += data.content;
                setCurrentStream(streamedResponse);
              }
            } catch (err) {
              console.error("Failed to parse SSE line", err);
            }
          }
        }
      }
    }
  }
}
```

The transition from clinical gray to aggressive red while the AI methodically types out exactly why you are the problem in your own life is a masterclass in hostile user experience design. 

## 4. The Final Blow: The Clinical Diagnosis

The final feature of the MVP was the "Diagnostics Modal." At any point during your argument with the AI, instead of getting standard advice, you can click a button that takes your entire conversation history, ships it to a separate endpoint (`/api/v1/diagnose`), and generates a clinical session summary. 

I wrote another highly specific LLM prompt for this feature:

```go
const diagnosisSystemPrompt = `You are a satirical clinical AI generating a brutally honest "session summary" or "diagnosis" based on the conversation history provided.

Your diagnosis must:
1. Be formatted like a clinical note but dripping with deadpan sarcasm.
2. Identify the user's actual flaws, not their perceived victimhood.
3. List at least three "presenting issues" derived from the conversation.
4. Include a blunt "prognosis" section that is unflattering but amusing.
5. Avoid any warmth, validation, or empathy.
6. Be no longer than 200 words.`
```

The result? It highlights your hypocrisies, bluntly lists your "presenting issues" (e.g., *Presenting Issue 1: Delusions of Adequacy*), and delivers a prognosis that is almost certainly terrible. 

## Satire as a Product

Building Zero-Star Therapy was a fascinating exercise in creating anti-UX. As software engineers, we spend thousands of hours trying to reduce friction, increase dopamine hits, and make our users feel deeply understood and loved by the glowing rectangles in their hands.

We build endless arrays of sycophantic chatbots that apologize when they don't know the answer. 

Sometimes, the most refreshing experience you can build is one that doesn't care about the user at all. Sometimes you just have to build a system that tells the user the truth: they are the drama.

Now, stop reading technical blogs about side projects you'll never finish, and go get a job.
