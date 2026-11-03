import { useEffect, useMemo, useRef, useState } from 'react'

type Category = 'Offense' | 'Defense' | 'ATO' | 'Transition'
type Filter = 'Alle Plays' | Category | 'Favoriten'
type Point = [number, number]

type Play = {
  id: number
  name: string
  subtitle: string
  category: Category
  formation: string
  difficulty: 'Einfach' | 'Mittel' | 'Anspruchsvoll'
  time: string
  description: string
  steps: string[]
  players: Point[]
  routes: string[]
  featured?: boolean
}

const plays: Play[] = [
  {
    id: 1,
    name: 'Horns Twist',
    subtitle: 'Der Klassiker mit zwei Optionen',
    category: 'Offense',
    formation: 'Horns',
    difficulty: 'Mittel',
    time: '18 Sek.',
    description:
      'Ein Horns-Einstieg bringt sofort Bewegung in die Defense. Der Ballhandler liest den ersten Block und kann je nach Reaktion zum Korb ziehen oder den freien Shooter finden.',
    steps: [
      '1 dribbelt in die Mitte, während 4 und 5 an den Elbows aufstellen.',
      '1 nutzt den Block von 5. 4 löst sich gleichzeitig zum Korb.',
      'Lässt die Defense den Drive zu, geht 1 direkt zum Abschluss. Sonst folgt der Pass zu 4 oder der Kick-out.',
    ],
    players: [[52, 100], [116, 34], [116, 166], [204, 34], [204, 166]],
    routes: [
      'M52 100 C95 100 124 102 159 99 S225 78 271 40',
      'M116 34 C150 34 154 65 177 88 S218 108 246 100',
      'M116 166 C147 166 157 137 177 113 S215 91 238 92',
      'M204 34 C219 34 223 57 235 67',
      'M204 166 C218 166 222 143 234 132',
    ],
    featured: true,
  },
  {
    id: 2,
    name: 'Spain Pick & Roll',
    subtitle: 'Zwei Blöcke, drei Reads',
    category: 'Offense',
    formation: 'High P&R',
    difficulty: 'Anspruchsvoll',
    time: '22 Sek.',
    description:
      'Der Back-Screen auf den rollenden Big zwingt die Defense zu einer schwierigen Entscheidung. Gleichzeitig öffnet sich der Screener für den Wurf an der Dreierlinie.',
    steps: [
      '1 startet das Pick & Roll mit 5 am oberen Zonenrand.',
      '2 setzt einen Back-Screen für 5 und öffnet sich dann an die Dreierlinie.',
      '1 liest den Switch: Lob zu 5, Pass zu 2 oder eigener Abschluss am Ring.',
    ],
    players: [[52, 100], [183, 34], [186, 166], [117, 34], [139, 100]],
    routes: [
      'M52 100 C100 100 135 100 176 98 S224 84 273 51',
      'M183 34 C188 53 205 63 223 59 S247 50 267 37',
      'M186 166 C163 150 142 131 154 111 S194 99 230 100',
      'M117 34 C122 54 133 66 148 76',
      'M139 100 C163 101 184 114 193 136',
    ],
  },
  {
    id: 3,
    name: 'Baseline Out',
    subtitle: 'Der sichere Einwurf mit Biss',
    category: 'ATO',
    formation: 'Baseline',
    difficulty: 'Einfach',
    time: '8 Sek.',
    description:
      'Eine klare erste Option und ein verlässlicher Safety-Pass machen diesen Baseline-Einwurf zum guten Start nach einer Auszeit oder in einer engen Schlussphase.',
    steps: [
      '5 stellt einen Screen für 2 an der Baseline.',
      '2 sprintet durch die Zone in die rechte Ecke.',
      'Kann 1 nicht direkt passen, löst sich 4 am Elbow für den Safety-Pass.',
    ],
    players: [[34, 30], [105, 166], [106, 34], [218, 34], [218, 166]],
    routes: [
      'M34 30 C61 30 77 40 95 56',
      'M105 166 C131 151 133 121 163 113 S224 122 267 153',
      'M106 34 C121 51 142 70 160 84',
      'M218 34 C206 51 205 71 217 90',
      'M218 166 C202 153 197 135 205 118',
    ],
  },
  {
    id: 4,
    name: '2–3 Zone Shift',
    subtitle: 'Die Zone in Bewegung bringen',
    category: 'Offense',
    formation: '2–3 Set',
    difficulty: 'Mittel',
    time: '16 Sek.',
    description:
      'Schnelle Ballbewegung und ein High-Low-Cut bringen die Zonenverteidigung ins Rotieren. Geduld zahlt sich aus: Der beste Wurf kommt meistens nach dem zweiten Pass.',
    steps: [
      '1 passt auf den Flügel zu 2 und füllt direkt die Ballseite.',
      '4 schneidet zum High Post, während 5 auf der Weakside zur Baseline geht.',
      '2 sucht den Pass in die Mitte oder spielt den Ball auf den freien Schützen.',
    ],
    players: [[52, 100], [123, 34], [123, 166], [206, 34], [206, 166]],
    routes: [
      'M52 100 C82 91 95 71 125 59',
      'M123 34 C149 36 168 47 188 63',
      'M123 166 C150 163 174 145 197 125',
      'M206 34 C189 55 175 74 164 93',
      'M206 166 C233 151 245 126 237 103 S218 75 225 55',
    ],
  },
  {
    id: 5,
    name: 'Full-Court Press',
    subtitle: 'Druck machen, Ball kontrollieren',
    category: 'Defense',
    formation: '1–2–1–1',
    difficulty: 'Anspruchsvoll',
    time: '24 Sek.',
    description:
      'Eine aggressive Diamant-Presse nimmt die erste Anspielstation weg und lenkt den Ball an die Seitenlinie. Die nächste Rotation schließt den Trap.',
    steps: [
      '1 lenkt den Einwerfer auf eine Seite und nimmt den Rückpass weg.',
      '2 sprintet zum Trap, sobald der Ball den Flügel erreicht.',
      '3 antizipiert den Pass zur Mitte; 4 und 5 sichern die lange Seite ab.',
    ],
    players: [[56, 100], [139, 45], [139, 155], [226, 100], [287, 100]],
    routes: [
      'M56 100 C91 100 104 79 133 70',
      'M139 45 C139 66 153 80 165 89',
      'M139 155 C154 140 161 123 164 108',
      'M226 100 C205 100 190 96 174 96',
      'M287 100 C262 101 240 88 224 76',
    ],
  },
  {
    id: 6,
    name: 'Secondary Break',
    subtitle: 'Tempo machen nach dem Rebound',
    category: 'Transition',
    formation: '3 Lanes',
    difficulty: 'Einfach',
    time: '12 Sek.',
    description:
      'Drei Laufwege halten die Defense breit. Kommt der frühe Pass nicht, geht es ohne Pause in den High Pick & Roll.',
    steps: [
      '1 nimmt den Rebound auf und bringt den Ball mit Tempo nach vorne.',
      '2 und 3 sprinten breit in die Ecken; 4 läuft die Mitte.',
      '5 folgt als Trailer und stellt oben den Block für 1.',
    ],
    players: [[51, 100], [119, 34], [119, 166], [197, 100], [224, 34]],
    routes: [
      'M51 100 C102 100 147 99 190 100 S240 87 275 68',
      'M119 34 C157 34 206 42 261 39',
      'M119 166 C157 166 209 158 262 162',
      'M197 100 C222 100 243 104 264 115',
      'M224 34 C219 55 220 71 237 82',
    ],
  },
]

const filters: Filter[] = ['Alle Plays', 'Offense', 'Defense', 'ATO', 'Transition', 'Favoriten']

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.2 4.2" />
    </svg>
  )
}

function BookmarkIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} aria-hidden="true">
      <path d="M6.5 4.75A1.75 1.75 0 0 1 8.25 3h7.5a1.75 1.75 0 0 1 1.75 1.75V21l-5.5-3.5L6.5 21V4.75Z" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  )
}

function CourtDiagram({ play, instance, featured = false }: { play: Play; instance: string; featured?: boolean }) {
  const markerId = `arrow-${play.id}-${instance}`

  return (
    <svg
      className={`court-diagram${featured ? ' court-diagram-featured' : ''}`}
      viewBox="0 0 360 200"
      role="img"
      aria-label={`Spielzugdiagramm für ${play.name}`}
    >
      <defs>
        <marker
          id={markerId}
          markerWidth="7"
          markerHeight="7"
          refX="5"
          refY="3.5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0 0 7 3.5 0 7z" className="route-arrow" />
        </marker>
      </defs>
      <rect x="7" y="7" width="346" height="186" rx="8" className="court-outline" />
      <path d="M34 7v186m0-52h37v-82H34m0 41h-17" className="court-lines" />
      <circle cx="71" cy="100" r="34" className="court-lines" />
      <path d="M326 7v186m0-52h-37v-82h37m0 41h17" className="court-lines" />
      <circle cx="289" cy="100" r="34" className="court-lines" />
      <circle cx="342" cy="100" r="5" className="court-hoop" />
      <path
        d={play.routes[0]}
        className="route route-primary"
        markerEnd={`url(#${markerId})`}
      />
      {play.routes.slice(1).map((route, index) => (
        <path
          key={`${play.id}-route-${index}`}
          d={route}
          className={`route ${index === 0 ? 'route-secondary' : 'route-other'}`}
          markerEnd={`url(#${markerId})`}
        />
      ))}
      {play.players.map(([x, y], index) => (
        <g key={`${play.id}-player-${index}`} className="player-marker" transform={`translate(${x} ${y})`}>
          <circle r="10.5" />
          <text y="3.4">{index + 1}</text>
        </g>
      ))}
    </svg>
  )
}

function App() {
  const [activeFilter, setActiveFilter] = useState<Filter>('Alle Plays')
  const [search, setSearch] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedPlay, setSelectedPlay] = useState<Play | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const visiblePlays = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('de')
    return plays.filter((play) => {
      const matchesFilter =
        activeFilter === 'Alle Plays' ||
        (activeFilter === 'Favoriten'
          ? favorites.includes(play.id)
          : play.category === activeFilter)
      const matchesSearch =
        query.length === 0 ||
        `${play.name} ${play.subtitle} ${play.category} ${play.formation}`
          .toLocaleLowerCase('de')
          .includes(query)
      return matchesFilter && matchesSearch
    })
  }, [activeFilter, favorites, search])

  useEffect(() => {
    const handleSearchShortcut = (event: KeyboardEvent) => {
      const target = event.target
      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      if (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey && !isTyping) {
        event.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleSearchShortcut)
    return () => document.removeEventListener('keydown', handleSearchShortcut)
  }, [])

  useEffect(() => {
    if (!selectedPlay) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedPlay(null)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('modal-open')
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('modal-open')
    }
  }, [selectedPlay])

  const toggleFavorite = (id: number) => {
    setFavorites((current) =>
      current.includes(id) ? current.filter((favorite) => favorite !== id) : [...current, id],
    )
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#" aria-label="Court Notes Startseite">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="12.5" />
              <path d="M4.2 13.2h23.6M4.2 18.8h23.6M16 3.5c4.3 4.4 6.4 8.5 6.4 12.5S20.3 24.1 16 28.5M16 3.5C11.7 7.9 9.6 12 9.6 16s2.1 8.1 6.4 12.5" />
            </svg>
          </span>
          <span className="brand-wordmark">court<span>notes</span></span>
        </a>
        <nav className="header-nav" aria-label="Hauptnavigation">
          <a className="nav-link nav-link-active" href="#playbook">Playbook</a>
          <a className="nav-link" href="#about">Über Court Notes</a>
        </nav>
        <a className="header-cta" href="#playbook">
          Zum Playbook <ArrowIcon />
        </a>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> FÜR DEIN NÄCHSTES SPIEL</div>
            <h1 id="hero-title">Gute Plays.<br /><span>Besseres Spiel.</span></h1>
            <p className="hero-description">
              Durchdachte Basketball-Plays, die dein Team weiterbringen. Einfach erklärt, direkt aufs Feld.
            </p>
            <a className="hero-button" href="#playbook">
              Plays entdecken <ArrowIcon />
            </a>
            <div className="hero-social-proof">
              <div className="avatar-stack" aria-hidden="true">
                <span>J</span><span>M</span><span>A</span><span>+</span>
              </div>
              <span>Für Coaches, die das Spiel lieben.</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-grid-pattern" aria-hidden="true" />
            <div className="hero-play-label"><span>01</span> PLAY OF THE DAY</div>
            <div className="hero-court-wrap"><CourtDiagram play={plays[0]} instance="featured" featured /></div>
            <div className="hero-play-card">
              <div>
                <span className="hero-card-tag">OFFENSE · HORNS</span>
                <h2>Horns Twist</h2>
                <p>Der Klassiker mit zwei Optionen</p>
              </div>
              <button className="hero-card-link" onClick={() => setSelectedPlay(plays[0])} aria-label="Horns Twist ansehen">
                <ArrowIcon />
              </button>
            </div>
            <span className="hero-deco hero-deco-one" aria-hidden="true">C</span>
            <span className="hero-deco hero-deco-two" aria-hidden="true">N°01</span>
          </div>
        </section>

        <section className="playbook-section" id="playbook" aria-labelledby="playbook-title">
          <div className="section-heading">
            <div>
              <div className="section-kicker">DAS PLAYBOOK</div>
              <h2 id="playbook-title">Finde deinen <span>Spielzug.</span></h2>
            </div>
            <p className="section-intro">Von der ersten Idee bis zum letzten Wurf — hier ist dein nächster Move.</p>
          </div>

          <div className="play-controls">
            <div className="filter-list" role="group" aria-label="Plays nach Kategorie filtern">
              {filters.map((filter) => (
                <button
                  className={`filter-button${activeFilter === filter ? ' filter-button-active' : ''}`}
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={activeFilter === filter}
                >
                  {filter === 'Favoriten' && <BookmarkIcon filled />}
                  {filter}
                  {filter === 'Favoriten' && favorites.length > 0 && (
                    <span className="favorite-count">{favorites.length}</span>
                  )}
                </button>
              ))}
            </div>
            <label className="search-field">
              <SearchIcon />
              <input
                ref={searchInputRef}
                type="search"
                placeholder="Play suchen..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Plays durchsuchen"
              />
              <kbd>/</kbd>
            </label>
          </div>

          <div className="results-meta" aria-live="polite">
            <span>{activeFilter === 'Alle Plays' ? 'ALLE SPIELZÜGE' : activeFilter.toUpperCase()}</span>
            <span>{visiblePlays.length.toString().padStart(2, '0')} PLAYS</span>
          </div>

          {visiblePlays.length > 0 ? (
            <div className={`play-grid${visiblePlays.length === 1 ? ' play-grid-single' : ''}`}>
              {visiblePlays.map((play, index) => (
                <article className="play-card" key={play.id} style={{ animationDelay: `${index * 55}ms` }}>
                  <div className="play-card-art">
                    <span className={`category-tag category-${play.category.toLowerCase()}`}>{play.category}</span>
                    <button
                      className={`favorite-button${favorites.includes(play.id) ? ' favorite-button-active' : ''}`}
                      onClick={() => toggleFavorite(play.id)}
                      aria-label={favorites.includes(play.id) ? `${play.name} aus Favoriten entfernen` : `${play.name} als Favorit speichern`}
                      aria-pressed={favorites.includes(play.id)}
                    >
                      <BookmarkIcon filled={favorites.includes(play.id)} />
                    </button>
                    <button
                      className="diagram-button"
                      onClick={() => setSelectedPlay(play)}
                      aria-label={`${play.name}: Details ansehen`}
                    >
                      <CourtDiagram play={play} instance={`card-${play.id}`} />
                    </button>
                  </div>
                  <button className="play-card-content" onClick={() => setSelectedPlay(play)}>
                    <div className="play-card-title-row">
                      <div>
                        <div className="play-formation">{play.formation}</div>
                        <h3>{play.name}</h3>
                      </div>
                      <span className="play-open-icon"><ArrowIcon /></span>
                    </div>
                    <p className="play-subtitle">{play.subtitle}</p>
                    <div className="card-divider" />
                    <div className="play-card-meta">
                      <span><span className="meta-dot" />{play.difficulty}</span>
                      <span>{play.time}</span>
                      <span>5 Spieler</span>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon"><SearchIcon /></div>
              <h3>{activeFilter === 'Favoriten' && !search ? 'Noch keine Favoriten' : 'Kein Play gefunden'}</h3>
              <p>{activeFilter === 'Favoriten' && !search
                ? 'Speichere Plays mit dem Lesezeichen, um sie hier wiederzufinden.'
                : 'Versuch es mit einem anderen Suchbegriff oder Filter.'}</p>
              <button
                className="empty-reset"
                onClick={() => { setActiveFilter('Alle Plays'); setSearch('') }}
              >
                Alle Plays anzeigen <ArrowIcon />
              </button>
            </div>
          )}
        </section>

        <section className="about-strip" id="about">
          <div className="about-icon" aria-hidden="true">
            <svg viewBox="0 0 40 40" fill="none">
              <path d="M7 32.5V10.8L20 5l13 5.8v21.7M7 14.5h26M20 5v27.5M11 20h5m8 0h5M11 26h5m8 0h5" />
            </svg>
          </div>
          <div>
            <div className="section-kicker">KLEINE TAKTIK, GROSSE WIRKUNG</div>
            <h2>Basketball ist ein Teamsport.<br /><span>Gute Vorbereitung auch.</span></h2>
          </div>
          <p>Jeder Spielzug ist mit klaren Schritten erklärt. Damit aus fünf Einzelnen ein Team wird.</p>
          <a href="#playbook" className="about-link" aria-label="Zurück zum Playbook"><ArrowIcon /></a>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#" aria-label="Court Notes Startseite">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="12.5" />
              <path d="M4.2 13.2h23.6M4.2 18.8h23.6M16 3.5c4.3 4.4 6.4 8.5 6.4 12.5S20.3 24.1 16 28.5M16 3.5C11.7 7.9 9.6 12 9.6 16s2.1 8.1 6.4 12.5" />
            </svg>
          </span>
          <span className="brand-wordmark">court<span>notes</span></span>
        </a>
        <span>Mit Liebe zum Spiel gemacht.</span>
        <a href="#playbook">Zurück nach oben ↑</a>
      </footer>

      {selectedPlay && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedPlay(null)
          }}
        >
          <section className="play-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="modal-close" onClick={() => setSelectedPlay(null)} aria-label="Details schließen">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
            </button>
            <div className="modal-art"><CourtDiagram play={selectedPlay} instance={`modal-${selectedPlay.id}`} /></div>
            <div className="modal-content">
              <span className={`category-tag category-${selectedPlay.category.toLowerCase()}`}>{selectedPlay.category}</span>
              <div className="play-formation modal-formation">{selectedPlay.formation} <span>·</span> {selectedPlay.difficulty} <span>·</span> {selectedPlay.time}</div>
              <h2 id="modal-title">{selectedPlay.name}</h2>
              <p className="modal-description">{selectedPlay.description}</p>
              <h3>So läuft das Play</h3>
              <ol className="play-steps">
                {selectedPlay.steps.map((step, index) => (
                  <li key={`${selectedPlay.id}-step-${index}`}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
              <button
                className={`modal-favorite${favorites.includes(selectedPlay.id) ? ' modal-favorite-active' : ''}`}
                onClick={() => toggleFavorite(selectedPlay.id)}
                aria-pressed={favorites.includes(selectedPlay.id)}
              >
                <BookmarkIcon filled={favorites.includes(selectedPlay.id)} />
                {favorites.includes(selectedPlay.id) ? 'Aus Favoriten entfernen' : 'Als Favorit speichern'}
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
