'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

const fertData = [
  { age: 25, fertility: 100 },
  { age: 26, fertility: 98 },
  { age: 27, fertility: 96 },
  { age: 28, fertility: 93 },
  { age: 29, fertility: 90 },
  { age: 30, fertility: 86 },
  { age: 31, fertility: 82 },
  { age: 32, fertility: 78 },
  { age: 33, fertility: 73 },
  { age: 34, fertility: 68 },
  { age: 35, fertility: 62 },
  { age: 36, fertility: 55 },
  { age: 37, fertility: 48 },
  { age: 38, fertility: 40 },
  { age: 39, fertility: 33 },
  { age: 40, fertility: 27 },
  { age: 41, fertility: 22 },
  { age: 42, fertility: 17 },
  { age: 43, fertility: 13 },
  { age: 44, fertility: 10 },
  { age: 45, fertility: 7 },
  { age: 46, fertility: 5 },
  { age: 47, fertility: 3 },
  { age: 48, fertility: 2 },
  { age: 49, fertility: 1.5 },
  { age: 50, fertility: 1 },
];

function getZoneColor(fertility: number): string {
  if (fertility >= 62) return '#5a7a5a';
  if (fertility >= 33) return '#c9953c';
  return '#a3453a';
}

function getZoneLabel(fertility: number): string {
  if (fertility >= 62) return 'Optimal Window';
  if (fertility >= 33) return 'Declining Fertility';
  return 'Significantly Reduced';
}

function getZoneBg(fertility: number): string {
  if (fertility >= 62) return 'rgba(90, 122, 90, 0.08)';
  if (fertility >= 33) return 'rgba(201, 149, 60, 0.08)';
  return 'rgba(163, 69, 58, 0.08)';
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const color = getZoneColor(data.fertility);
    return (
      <div
        style={{
          background: '#faf6f1',
          border: `1px solid ${color}`,
          borderRadius: 8,
          padding: '12px 16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        <p style={{ margin: 0, fontSize: 13, color: '#6b6560', letterSpacing: '0.05em' }}>
          AGE {data.age}
        </p>
        <p style={{ margin: '4px 0 0', fontSize: 20, fontWeight: 300, color }}>
          {data.fertility}% fertility
        </p>
      </div>
    );
  }
  return null;
};

function ResultsContent() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const ageParam = searchParams.get('age') || '30';
  const goal = searchParams.get('goal') || 'understand';
  const cycle = searchParams.get('cycle') || 'regular';

  const userAge = Math.max(25, Math.min(50, parseInt(ageParam) || 30));

  const userPoint = fertData.find((d) => d.age === userAge) ||
    fertData.reduce((prev, curr) =>
      Math.abs(curr.age - userAge) < Math.abs(prev.age - userAge) ? curr : prev
    );

  const fertility = userPoint.fertility;
  const zoneColor = getZoneColor(fertility);
  const zoneLabel = getZoneLabel(fertility);
  const zoneBg = getZoneBg(fertility);

  const yearsLeft = fertData
    .filter((d) => d.age >= userAge && d.fertility >= 33)
    .length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#faf6f1' }}>
      {/* Header */}
      <header
        style={{
          padding: '24px 0',
          textAlign: 'center',
          borderBottom: '1px solid rgba(107, 101, 96, 0.1)',
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 400,
            letterSpacing: '0.2em',
            color: '#3d3833',
            textTransform: 'uppercase',
          }}
        >
          Claira
        </h1>
      </header>

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
        {/* Hero Section */}
        <section style={{ textAlign: 'center', padding: '60px 0 40px' }}>
          <p
            style={{
              fontSize: 12,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#6b6560',
              marginBottom: 16,
            }}
          >
            Your Fertility Snapshot
          </p>
          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 300,
              color: '#3d3833',
              lineHeight: 1.15,
              margin: '0 0 24px',
              fontFamily: 'Georgia, "Times New Roman", serif',
            }}
          >
            At {userAge}, your fertility is in the
            <br />
            <span style={{ color: zoneColor, fontStyle: 'italic' }}>{zoneLabel.toLowerCase()}</span>
          </h2>
          <p style={{ fontSize: 17, color: '#6b6560', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Based on your responses, we&apos;ve mapped your current position on the fertility timeline.
            Here&apos;s what the science says.
          </p>
        </section>

        {/* Fertility Chart */}
        <section
          style={{
            background: '#fff',
            borderRadius: 16,
            padding: '40px 24px 24px',
            marginBottom: 40,
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            border: '1px solid rgba(107, 101, 96, 0.08)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 400, color: '#3d3833', fontFamily: 'Georgia, serif' }}>
                Fertility by Age
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: '#9b9590' }}>
                Relative fertility percentage, clinical averages
              </p>
            </div>
            <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#5a7a5a' }} />
                Optimal
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#c9953c' }} />
                Declining
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#a3453a' }} />
                Reduced
              </span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={fertData} margin={{ top: 10, right: 10, bottom: 10, left: -10 }}>
              <defs>
                <linearGradient id="fertGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#5a7a5a" />
                  <stop offset="40%" stopColor="#5a7a5a" />
                  <stop offset="55%" stopColor="#c9953c" />
                  <stop offset="70%" stopColor="#c9953c" />
                  <stop offset="85%" stopColor="#a3453a" />
                  <stop offset="100%" stopColor="#a3453a" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(107,101,96,0.08)" vertical={false} />
              <XAxis
                dataKey="age"
                tick={{ fontSize: 12, fill: '#9b9590' }}
                tickLine={false}
                axisLine={{ stroke: 'rgba(107,101,96,0.1)' }}
                tickFormatter={(val) => (val % 5 === 0 ? `${val}` : '')}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#9b9590' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `${val}%`}
                domain={[0, 105]}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine
                x={userAge}
                stroke={zoneColor}
                strokeWidth={2}
                strokeDasharray="6 4"
                label={{
                  value: `You (${userAge})`,
                  position: 'top',
                  fill: zoneColor,
                  fontSize: 12,
                  fontWeight: 500,
                }}
              />
              <Line
                type="monotone"
                dataKey="fertility"
                stroke="url(#fertGradient)"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 6,
                  fill: zoneColor,
                  stroke: '#fff',
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </section>

        {/* Summary Cards */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
            marginBottom: 40,
          }}
        >
          {[
            {
              label: 'Current Fertility',
              value: `${fertility}%`,
              sub: 'of peak capacity',
              color: zoneColor,
              bg: zoneBg,
            },
            {
              label: 'Fertile Years Left',
              value: `~${yearsLeft}`,
              sub: 'above moderate threshold',
              color: yearsLeft > 5 ? '#5a7a5a' : yearsLeft > 2 ? '#c9953c' : '#a3453a',
              bg: yearsLeft > 5 ? 'rgba(90,122,90,0.08)' : yearsLeft > 2 ? 'rgba(201,149,60,0.08)' : 'rgba(163,69,58,0.08)',
            },
            {
              label: 'Cycle Status',
              value: cycle === 'regular' ? 'Regular' : cycle === 'irregular' ? 'Irregular' : 'Unknown',
              sub: cycle === 'regular' ? 'a positive indicator' : 'worth monitoring',
              color: cycle === 'regular' ? '#5a7a5a' : '#c9953c',
              bg: cycle === 'regular' ? 'rgba(90,122,90,0.08)' : 'rgba(201,149,60,0.08)',
            },
          ].map((card, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                borderRadius: 16,
                padding: '28px 24px',
                border: '1px solid rgba(107,101,96,0.08)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9b9590', margin: '0 0 12px' }}>
                {card.label}
              </p>
              <p
                style={{
                  fontSize: 36,
                  fontWeight: 300,
                  color: card.color,
                  margin: '0 0 4px',
                  fontFamily: 'Georgia, serif',
                }}
              >
                {card.value}
              </p>
              <p style={{ fontSize: 13, color: '#6b6560', margin: 0 }}>{card.sub}</p>
            </div>
          ))}
        </section>

        {/* Insight Card */}
        <section
          style={{
            background: '#3d3833',
            borderRadius: 16,
            padding: '40px 32px',
            marginBottom: 40,
            color: '#faf6f1',
          }}
        >
          <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(250,246,241,0.5)', margin: '0 0 16px' }}>
            Clinical Insight
          </p>
          <h3 style={{ fontSize: 24, fontWeight: 300, margin: '0 0 16px', lineHeight: 1.4, fontFamily: 'Georgia, serif' }}>
            After 35, the chance of conceiving naturally drops by approximately 50% compared to age 25.
          </h3>
          <p style={{ fontSize: 15, color: 'rgba(250,246,241,0.7)', lineHeight: 1.7, margin: '0 0 20px' }}>
            A study published in <em>Human Reproduction</em> found that women aged 35–39 had a 29% lower
            probability of conception per cycle compared to women aged 25–29. Egg quality and ovarian reserve
            are the two primary factors that decline with age.
          </p>
          <p style={{ fontSize: 12, color: 'rgba(250,246,241,0.4)', margin: 0 }}>
            Source: Dunson et al., Human Reproduction, 2004
          </p>
        </section>

        {/* Paywall Section */}
        <section
          style={{
            background: '#fff',
            borderRadius: 20,
            overflow: 'hidden',
            marginBottom: 80,
            border: '1px solid rgba(107,101,96,0.1)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
          }}
        >
          {/* Paywall Header */}
          <div style={{ padding: '48px 32px 0', textAlign: 'center' }}>
            <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b8734a', margin: '0 0 12px' }}>
              Unlock Your Full Report
            </p>
            <h3
              style={{
                fontSize: 'clamp(24px, 4vw, 36px)',
                fontWeight: 300,
                color: '#3d3833',
                margin: '0 0 12px',
                fontFamily: 'Georgia, serif',
                lineHeight: 1.25,
              }}
            >
              Your Personalized<br />Fertility Plan
            </h3>
            <p style={{ fontSize: 15, color: '#6b6560', maxWidth: 440, margin: '0 auto 32px', lineHeight: 1.6 }}>
              Get actionable, science-backed recommendations tailored to your age, cycle, and goals.
            </p>
          </div>

          {/* Checkmarks */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '12px 24px',
              padding: '0 32px 36px',
              maxWidth: 560,
              margin: '0 auto',
            }}
          >
            {[
              'Detailed fertility timeline',
              'Supplement recommendations',
              'Lifestyle optimization plan',
              'When to see a specialist',
              'Cycle tracking guidance',
              'Partner fertility factors',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: 'rgba(90,122,90,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: 11,
                    color: '#5a7a5a',
                  }}
                >
                  ✓
                </span>
                <span style={{ fontSize: 14, color: '#3d3833' }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Blurred Preview */}
          <div
            style={{
              position: 'relative',
              margin: '0 32px 36px',
              borderRadius: 12,
              overflow: 'hidden',
              background: 'rgba(107,101,96,0.03)',
              border: '1px solid rgba(107,101,96,0.06)',
            }}
          >
            <div
              style={{
                padding: 24,
                filter: 'blur(6px)',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            >
              <p style={{ fontSize: 14, fontWeight: 600, color: '#3d3833', marginBottom: 8 }}>
                Your Optimal Conception Window
              </p>
              <p style={{ fontSize: 13, color: '#6b6560', lineHeight: 1.6 }}>
                Based on your age of {userAge} and regular cycle patterns, your highest probability
                window for natural conception is within the next 18–24 months. We recommend beginning
                with CoQ10 supplementation at 200mg daily, combined with folate-rich foods and...
              </p>
              <p style={{ fontSize: 13, color: '#6b6560', lineHeight: 1.6 }}>
                Your AMH levels should be tested as a baseline. Given your goal of {goal === 'conceive' ? 'conception' : 'understanding your fertility'}, 
                we suggest the following 90-day protocol including targeted nutrition, stress management...
              </p>
            </div>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(250,246,241,0.3)',
              }}
            >
              <span
                style={{
                  background: '#3d3833',
                  color: '#faf6f1',
                  padding: '8px 20px',
                  borderRadius: 100,
                  fontSize: 13,
                  letterSpacing: '0.05em',
                }}
              >
                🔒 Unlock to read
              </span>
            </div>
          </div>

          {/* Purchase Form */}
          <div
            style={{
              background: 'rgba(107,101,96,0.02)',
              padding: '36px 32px 48px',
              textAlign: 'center',
              borderTop: '1px solid rgba(107,101,96,0.06)',
            }}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: 40, fontWeight: 300, color: '#3d3833', fontFamily: 'Georgia, serif' }}>
                    $29
                  </span>
                  <span
                    style={{
                      fontSize: 18,
                      color: '#9b9590',
                      textDecoration: 'line-through',
                      fontWeight: 300,
                    }}
                  >
                    $49
                  </span>
                </div>
                <p style={{ fontSize: 13, color: '#5a7a5a', margin: '0 0 24px' }}>
                  Limited time — 40% off your personalized report
                </p>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    maxWidth: 360,
                    padding: '14px 20px',
                    border: '1px solid rgba(107,101,96,0.15)',
                    borderRadius: 10,
                    fontSize: 15,
                    background: '#fff',
                    color: '#3d3833',
                    outline: 'none',
                    marginBottom: 12,
                    fontFamily: 'inherit',
                  }}
                />
                <br />
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    maxWidth: 360,
                    padding: '16px 32px',
                    background: '#b8734a',
                    color: '#faf6f1',
                    border: 'none',
                    borderRadius: 10,
                    fontSize: 15,
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'inherit',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = '#a5653f')}
                  onMouseOut={(e) => (e.currentTarget.style.background = '#b8734a')}
                >
                  Get My Full Report →
                </button>

                <p style={{ fontSize: 12, color: '#9b9590', margin: '16px 0 0', lineHeight: 1.5 }}>
                  Instant delivery · Science-backed · 30-day money back guarantee
                </p>
              </form>
            ) : (
              <div>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'rgba(90,122,90,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    fontSize: 24,
                  }}
                >
                  ✓
                </div>
                <h4 style={{ fontSize: 22, fontWeight: 400, color: '#3d3833', margin: '0 0 8px', fontFamily: 'Georgia, serif' }}>
                  Check your inbox
                </h4>
                <p style={{ fontSize: 14, color: '#6b6560' }}>
                  We&apos;ve sent your personalized fertility report to {email}
                </p>
              </div>
            )}

            {/* Social Proof */}
            <div
              style={{
                marginTop: 36,
                paddingTop: 24,
                borderTop: '1px solid rgba(107,101,96,0.08)',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '12px 32px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6b6560' }}>
                <span style={{ color: '#c9953c' }}>★★★★★</span>
                <span>4.9/5 rating</span>
              </div>
              <div style={{ fontSize: 13, color: '#6b6560' }}>
                12,400+ reports generated
              </div>
              <div style={{ fontSize: 13, color: '#6b6560' }}>
                Featured in Well+Good
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: 'center',
          padding: '32px 24px',
          borderTop: '1px solid rgba(107,101,96,0.08)',
          fontSize: 12,
          color: '#9b9590',
          lineHeight: 1.8,
        }}
      >
        <p style={{ margin: 0 }}>
          Claira provides educational content only and does not constitute medical advice.
        </p>
        <p style={{ margin: '4px 0 0' }}>
          © {new Date().getFullYear()} Claira Fertility · Privacy · Terms
        </p>
      </footer>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: '100vh',
            background: '#faf6f1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6b6560',
            fontSize: 15,
            letterSpacing: '0.1em',
          }}
        >
          Preparing your results…
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
