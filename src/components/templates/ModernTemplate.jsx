import React from 'react';

/**
 * ModernTemplate — uses ONLY inline styles (no Tailwind classes)
 * so html2canvas can render it without oklch color errors.
 */
const ModernTemplate = ({ data }) => {
  const { personalInfo, summary, skills, experience, education, settings } = data;
  const primaryColor = settings.color || '#3b82f6';
  const fontFamily = settings.font || 'Inter';

  const styles = {
    page: {
      width: '794px',
      minHeight: '1123px',
      backgroundColor: '#ffffff',
      color: '#1e293b',
      padding: '40px',
      fontFamily,
      fontSize: '14px',
      lineHeight: '1.5',
      boxSizing: 'border-box',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      borderBottom: `4px solid ${primaryColor}`,
      paddingBottom: '24px',
      marginBottom: '24px',
    },
    name: {
      fontSize: '32px',
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      color: '#0f172a',
      marginBottom: '4px',
    },
    jobTitle: {
      fontSize: '18px',
      fontWeight: '500',
      color: primaryColor,
    },
    contactInfo: {
      textAlign: 'right',
      fontSize: '12px',
      color: '#64748b',
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
    },
    body: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '32px',
    },
    sectionTitle: {
      fontSize: '14px',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      color: primaryColor,
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    sectionDivider: {
      display: 'inline-block',
      width: '16px',
      height: '2px',
      backgroundColor: primaryColor,
    },
    skillBadge: {
      display: 'inline-block',
      fontSize: '11px',
      fontWeight: '500',
      padding: '3px 8px',
      backgroundColor: '#f1f5f9',
      color: '#475569',
      border: '1px solid #e2e8f0',
      borderRadius: '4px',
      marginRight: '6px',
      marginBottom: '6px',
    },
    expEntry: {
      marginBottom: '20px',
    },
    expRole: {
      fontWeight: '700',
      color: '#0f172a',
      fontSize: '14px',
    },
    expCompany: {
      fontSize: '13px',
      fontWeight: '500',
      color: '#475569',
      marginTop: '2px',
    },
    expDates: {
      fontSize: '11px',
      color: '#94a3b8',
      fontWeight: '500',
    },
    bullet: {
      fontSize: '12px',
      color: '#334155',
      marginBottom: '4px',
      paddingLeft: '12px',
      position: 'relative',
    },
    eduEntry: {
      marginBottom: '14px',
    },
    eduDegree: {
      fontWeight: '700',
      fontSize: '13px',
      color: '#0f172a',
    },
    eduInstitution: {
      fontSize: '12px',
      color: '#475569',
    },
    eduYear: {
      fontSize: '11px',
      color: '#94a3b8',
    },
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={styles.name}>{personalInfo.fullName || 'Your Name'}</div>
          <div style={styles.jobTitle}>{personalInfo.jobTitle || 'Job Title'}</div>
        </div>
        <div style={styles.contactInfo}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.links && <span>{personalInfo.links}</span>}
        </div>
      </div>

      {/* Body */}
      <div style={styles.body}>
        {/* Left Column */}
        <div>
          {summary && (
            <div style={{ marginBottom: '24px' }}>
              <div style={styles.sectionTitle}>
                <span style={styles.sectionDivider}></span> Profile
              </div>
              <p style={{ fontSize: '13px', lineHeight: '1.7', color: '#334155' }}>{summary}</p>
            </div>
          )}

          {experience && experience.length > 0 && experience[0].company && (
            <div>
              <div style={styles.sectionTitle}>
                <span style={styles.sectionDivider}></span> Experience
              </div>
              {experience.map((exp, idx) => (
                <div key={idx} style={styles.expEntry}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={styles.expRole}>{exp.role}</div>
                    <div style={styles.expDates}>{exp.dates}</div>
                  </div>
                  <div style={styles.expCompany}>{exp.company}</div>
                  {exp.bullets && (
                    <ul style={{ marginTop: '8px', paddingLeft: '18px', listStyle: 'disc' }}>
                      {exp.bullets.split('\n').filter(b => b.trim()).map((bullet, i) => (
                        <li key={i} style={{ fontSize: '12px', color: '#334155', marginBottom: '4px' }}>
                          {bullet.replace(/^- /, '')}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div>
          {skills && (
            <div style={{ marginBottom: '24px' }}>
              <div style={styles.sectionTitle}>
                <span style={styles.sectionDivider}></span> Skills
              </div>
              <div>
                {skills.split(',').map((skill, idx) => (
                  <span key={idx} style={styles.skillBadge}>{skill.trim()}</span>
                ))}
              </div>
            </div>
          )}

          {education && education.length > 0 && education[0].institution && (
            <div>
              <div style={styles.sectionTitle}>
                <span style={styles.sectionDivider}></span> Education
              </div>
              {education.map((edu, idx) => (
                <div key={idx} style={styles.eduEntry}>
                  <div style={styles.eduDegree}>{edu.degree}</div>
                  <div style={styles.eduInstitution}>{edu.institution}</div>
                  <div style={styles.eduYear}>{edu.year}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
