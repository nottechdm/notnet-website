import './App.css'

const navItems = [
  { label: 'Overview', href: '#overview' },
  { label: 'Install', href: '#install' },
  { label: 'Quick start', href: '#quick-start' },
  { label: 'Routing', href: '#routing' },
  { label: 'Groups', href: '#groups' },
  { label: 'Middleware', href: '#middleware' },
  { label: 'JSON', href: '#json' },
  { label: 'SSE', href: '#sse' },
  { label: 'Errors', href: '#errors' },
  { label: 'API reference', href: '#reference' },
]

const features = [
  'Fast route registration',
  'Grouped APIs and versioned routes',
  'JSON binding and structured responses',
  'Middleware stack and request filters',
  'SSE event streaming for realtime apps',
  'Clean error handlers and recovery hooks',
]

const stats = [
  { label: 'Routes', value: '100%' },
  { label: 'Middleware', value: 'Flexible' },
  { label: 'SSE', value: 'Built-in' },
  { label: 'Go-first', value: 'Simple' },
]

const quickSteps = [
  'Create your app instance with notnet.New()',
  'Register routes and route groups',
  'Attach middleware for auth, logging, and recovery',
  'Return JSON, plain text, or stream events',
]

const apiGroups = [
  {
    title: 'Core server',
    items: ['New', 'Listen', 'Shutdown', 'Use', 'Group', 'Static', 'ServeFile'],
  },
  {
    title: 'HTTP verbs',
    items: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD', 'Any'],
  },
  {
    title: 'Request helpers',
    items: ['Param', 'Query', 'Header', 'BindJSON', 'Form', 'Cookie', 'Context'],
  },
  {
    title: 'Response helpers',
    items: ['JSON', 'String', 'Text', 'HTML', 'Status', 'NoContent', 'Redirect'],
  },
  {
    title: 'Middleware',
    items: ['Logger', 'Recovery', 'CORS', 'RequestID', 'AuthRequired', 'RateLimit', 'Compress'],
  },
  {
    title: 'Realtime',
    items: ['SSE', 'SendEvent', 'Stream', 'Subscribe', 'Push', 'Emit'],
  },
  {
    title: 'Errors',
    items: ['SetNotFoundHandler', 'SetErrorHandler', 'HandlePanic', 'ErrorResponse', 'RenderError'],
  },
]

const keywords = new Set([
  'package', 'import', 'func', 'return', 'if', 'else', 'for', 'range', 'defer', 'var', 'const', 'type', 'struct', 'map', 'true', 'false', 'nil', 'go', 'case', 'switch', 'default', 'break', 'continue', 'select', 'fallthrough', 'interface', 'new', 'len', 'make', 'time',
])

const builtinTypes = new Set([
  'string', 'int', 'bool', 'float64', 'map', 'error', 'interface', 'time', 'http', 'time.Duration', '[]byte', '[]string',
])

const operatorChars = new Set(['=', '+', '-', '*', '/', '%', '!', '&', '|', '<', '>', ':', ',', '.', '{', '}', '(', ')', '[', ']', ';'])

function renderHighlightedCode(code) {
  const lines = code.split('\n')

  return lines.map((line, lineIndex) => (
    <div className="code-line" key={`${lineIndex}-${line}`}>
      {tokenizeLine(line)}
    </div>
  ))
}

function tokenizeLine(line) {
  const pattern = /(\/\/.*$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b[A-Za-z_][A-Za-z0-9_]*\b|\d+|\s+|[{}()[\].,:;=<>+\-*/%!&|]+|\b\w+\b)/g
  const parts = line.match(pattern) || []

  return parts.map((part, index) => {
    if (!part) return null

    if (/^\s+$/.test(part)) {
      return <span key={`${part}-${index}`}>{part}</span>
    }

    if (part.startsWith('//')) {
      return <span key={`${part}-${index}`} className="token-comment">{part}</span>
    }

    if ((part.startsWith('"') && part.endsWith('"')) || (part.startsWith("'") && part.endsWith("'"))) {
      return <span key={`${part}-${index}`} className="token-string">{part}</span>
    }

    if (/^\d+$/.test(part)) {
      return <span key={`${part}-${index}`} className="token-number">{part}</span>
    }

    if (operatorChars.has(part)) {
      return <span key={`${part}-${index}`} className="token-operator">{part}</span>
    }

    if (keywords.has(part)) {
      return <span key={`${part}-${index}`} className="token-keyword">{part}</span>
    }

    if (builtinTypes.has(part)) {
      return <span key={`${part}-${index}`} className="token-type">{part}</span>
    }

    if (part === 'main' || /^[A-Z]/.test(part)) {
      return <span key={`${part}-${index}`} className="token-constant">{part}</span>
    }

    if (part.includes('(') || part.includes(')')) {
      return <span key={`${part}-${index}`} className="token-func">{part}</span>
    }

    return <span key={`${part}-${index}`} className="token-default">{part}</span>
  })
}

const installSnippet = `go get github.com/nottechdm/notnet`

const quickStartCode = `package main

import (
    "log"
    "github.com/nottechdm/notnet/pkg/notnet"
)

func main() {
    app := notnet.New(nil)
    app.Use(notnet.Logger(), notnet.Recovery())

    app.GET("/ping", func(req *notnet.Request, res *notnet.Response) error {
        return res.String(200, "pong")
    })

    app.GET("/users/:id", func(req *notnet.Request, res *notnet.Response) error {
        id := req.Param("id")
        return res.JSON(200, map[string]string{"user_id": id})
    })

    log.Fatal(app.Listen(":8080"))
}`

const routingCode = `app.GET("/health", func(req *notnet.Request, res *notnet.Response) error {
    return res.JSON(200, map[string]string{"status": "ok"})
})

app.POST("/users", func(req *notnet.Request, res *notnet.Response) error {
    var payload map[string]string
    if err := req.BindJSON(&payload); err != nil {
        return res.JSON(400, map[string]string{"error": "invalid payload"})
    }
    return res.JSON(201, payload)
})

app.PUT("/users/:id", func(req *notnet.Request, res *notnet.Response) error {
    id := req.Param("id")
    return res.JSON(200, map[string]string{"updated": id})
})

app.DELETE("/users/:id", func(req *notnet.Request, res *notnet.Response) error {
    id := req.Param("id")
    return res.JSON(200, map[string]string{"deleted": id})
})`

const groupCode = `api := app.Group("/api/v1")
api.Use(notnet.AuthRequired())

api.GET("/profile", func(req *notnet.Request, res *notnet.Response) error {
    return res.JSON(200, map[string]string{"status": "ok"})
})

api.POST("/profile/avatar", func(req *notnet.Request, res *notnet.Response) error {
    return res.JSON(200, map[string]string{"status": "uploaded"})
})

v2 := app.Group("/api/v2")
v2.GET("/status", func(req *notnet.Request, res *notnet.Response) error {
    return res.JSON(200, map[string]string{"status": "healthy"})
})`

const middlewareCode = `app.Use(notnet.Logger())
app.Use(notnet.Recovery())
app.Use(notnet.CORS(nil))
app.Use(notnet.RequestID("X-Request-ID"))

app.Use(func(req *notnet.Request, res *notnet.Response) error {
    if req.Header("Authorization") == "" {
        return res.JSON(401, map[string]string{"error": "missing token"})
    }
    return req.Next()
})`

const jsonCode = `type CreateUserRequest struct {
    Name  string ` + '`json:"name"`' + `
    Email string ` + '`json:"email"`' + `
}

app.POST("/users", func(req *notnet.Request, res *notnet.Response) error {
    var payload CreateUserRequest
    if err := req.BindJSON(&payload); err != nil {
        return res.JSON(400, map[string]string{"error": "invalid payload"})
    }

    return res.JSON(201, map[string]interface{}{
        "id":    42,
        "name":  payload.Name,
        "email": payload.Email,
    })
})`

const sseCode = `app.GET("/events", func(req *notnet.Request, res *notnet.Response) error {
    res.SSE()
    ticker := time.NewTicker(time.Second)
    defer ticker.Stop()

    for i := 0; i < 10; i++ {
        <-ticker.C
        if err := res.SendEvent("message", map[string]interface{}{"id": i}); err != nil {
            return err
        }
    }
    return nil
})`

const errorCode = `app.SetNotFoundHandler(func(req *notnet.Request, res *notnet.Response) {
    _ = res.JSON(404, map[string]string{
        "error": "endpoint not found",
        "path":  req.Path(),
    })
})

app.Use(func(req *notnet.Request, res *notnet.Response) error {
    if req.Header("X-API-Key") == "" {
        return res.JSON(401, map[string]string{"error": "missing api key"})
    }
    return req.Next()
})`

const referenceCode = `app := notnet.New(&notnet.EngineOption{
    ReadTimeout:  15 * time.Second,
    WriteTimeout: 15 * time.Second,
    IdleTimeout:  60 * time.Second,
})

app.Use(notnet.Logger(), notnet.Recovery())
app.GET("/health", func(req *notnet.Request, res *notnet.Response) error {
    return res.JSON(200, map[string]string{"status": "ok"})
})`

function App() {
  return (
    <div className="docs-shell">
      <aside className="sidebar">
        <div className="sidebar-inner">
          <div className="brand-row" aria-label="NotNet home">
            <img src="/logo.png" alt="NotNet logo" className="brand-logo" />
            <span className="brand-name">NotNet</span>
          </div>

          <nav className="side-nav" aria-label="Sidebar navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="sidebar-card">
            <p className="sidebar-label">Why use it</p>
            <ul>
              {features.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <span className="eyebrow">Go HTTP router</span>
          </div>
          <a className="github-link" href="https://github.com/nottechdm/notnet" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </header>

        <section className="hero" id="overview">
          <div>
            <p className="eyebrow">Overview</p>
            <h1>Build clean APIs without the framework bloat.</h1>
            <p className="lede">
              NotNet gives you a small, ergonomic HTTP layer for Go. It keeps route registration,
              middleware, grouped endpoints, JSON handling, and streaming responses in one easy-to-learn API.
            </p>
          </div>

          <div className="stats-grid">
            {stats.map((stat) => (
              <div className="stat-box" key={stat.label}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="doc-section" id="install">
          <div className="section-head">
            <p className="eyebrow">Install</p>
            <h2>Get started in one command</h2>
          </div>

          <div className="code-block dark-box">
            <code>{renderHighlightedCode(installSnippet)}</code>
          </div>
        </section>

        <section className="doc-section" id="quick-start">
          <div className="section-head">
            <p className="eyebrow">Quick start</p>
            <h2>Your first service</h2>
          </div>

          <div className="callout-row">
            {quickSteps.map((step, index) => (
              <div className="callout-item" key={step}>
                <span className="step-num">0{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>

          <div className="code-block dark-box large">
            <code>{renderHighlightedCode(quickStartCode)}</code>
          </div>
        </section>

        <section className="doc-section" id="routing">
          <div className="section-head">
            <p className="eyebrow">Routing</p>
            <h2>Simple path registration and custom responses</h2>
          </div>

          <div className="code-block dark-box">
            <code>{renderHighlightedCode(routingCode)}</code>
          </div>
        </section>

        <section className="doc-section" id="groups">
          <div className="section-head">
            <p className="eyebrow">Groups</p>
            <h2>Organize endpoints by version, feature, or auth scope</h2>
          </div>

          <div className="code-block dark-box">
            <code>{renderHighlightedCode(groupCode)}</code>
          </div>
        </section>

        <section className="doc-section" id="middleware">
          <div className="section-head">
            <p className="eyebrow">Middleware</p>
            <h2>Attach shared behavior anywhere in your app</h2>
          </div>

          <div className="code-block dark-box">
            <code>{renderHighlightedCode(middlewareCode)}</code>
          </div>

          <div className="info-grid">
            <div className="info-card">
              <h3>Logger()</h3>
              <p>Log request method, route, remote address, and timing.</p>
            </div>
            <div className="info-card">
              <h3>Recovery()</h3>
              <p>Catch panics and convert unexpected failures into safe responses.</p>
            </div>
            <div className="info-card">
              <h3>CORS()</h3>
              <p>Allow browser clients to reach protected APIs with explicit policy control.</p>
            </div>
            <div className="info-card">
              <h3>AuthRequired()</h3>
              <p>Protect groups or entire route trees without writing repetitive checks.</p>
            </div>
          </div>
        </section>

        <section className="doc-section examples-section">
          <div className="section-head">
            <p className="eyebrow">Patterns</p>
            <h2>Common patterns for real services</h2>
          </div>

          <div className="pattern-grid">
            <div className="pattern-card">
              <h3>REST API</h3>
              <p>Use groups for versioning, auth, and feature scopes.</p>
            </div>
            <div className="pattern-card">
              <h3>Realtime UI</h3>
              <p>Combine SSE and websockets-friendly route streams for live dashboards.</p>
            </div>
            <div className="pattern-card">
              <h3>Internal tooling</h3>
              <p>Keep request validation, rate limits, and recovery in middleware stacks.</p>
            </div>
          </div>
        </section>

        <section className="doc-section" id="json">
          <div className="section-head">
            <p className="eyebrow">JSON</p>
            <h2>Bind payloads and return clean API responses</h2>
          </div>

          <div className="code-block dark-box">
            <code>{renderHighlightedCode(jsonCode)}</code>
          </div>
        </section>

        <section className="doc-section" id="sse">
          <div className="section-head">
            <p className="eyebrow">SSE</p>
            <h2>Stream updates to browser clients in real time</h2>
          </div>

          <div className="code-block dark-box">
            <code>{renderHighlightedCode(sseCode)}</code>
          </div>
        </section>

        <section className="doc-section" id="errors">
          <div className="section-head">
            <p className="eyebrow">Errors</p>
            <h2>Handle missing routes, auth failure, and failure modes cleanly</h2>
          </div>

          <div className="code-block dark-box">
            <code>{renderHighlightedCode(errorCode)}</code>
          </div>
        </section>

        <section className="doc-section" id="reference">
          <div className="section-head">
            <p className="eyebrow">API reference</p>
            <h2>Reference surface</h2>
          </div>

          <div className="reference-grid">
            {apiGroups.map((group) => (
              <div className="api-card" key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="code-block dark-box reference-block">
            <code>{renderHighlightedCode(referenceCode)}</code>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
