import React from 'react';
import ModernTemplate from './ModernTemplate';

/**
 * MinimalTemplate — 100% inline styles (no Tailwind)
 * Required so html2canvas works for PDF export (Tailwind v4 uses oklch colors).
 */
const MinimalTemplate = ({ data }) => {
  const { personalInfo, summary, skills, experience, education, settings } = data;
  const fontFamily = settings.font || 'Inter';

  const s = {
    page: {
      width: '794px',
      minHeight: '1123px',
      backgroundColor: '#ffffff',
      color: '#374151',
      padding: '48px 56px',
      fontFamily,
      boxSizing: 'border-box',
    },
    headerCenter: {
      textAlign: 'center',
      marginBottom: '32px',
    },
    name: {
      fontSize: '30px',
      fontWeight: '300',
      letterSpacing: '4px',
      color: '#111827',
      marginBottom: '6px',
    },
    title: {
      fontSize: '13px',
      fontWeight: '500',
      color: '#9ca3af',
      textTransform: 'uppercase',
      letterSpacing: '3px',
      marginBottom: '12px',
    },
    contactRow: {
      display: 'flex',
      justifyContent: 'center',
      gap: '16px',
      fontSize: '11px',
      color: '#9ca3af',
    },
    summaryBlock: {
      textAlign: 'center',
      marginBottom: '32px',
    },
    summaryText: {
      fontSize: '13px',
      lineHeight: '1.8',
      color: '#6b7280',
      maxWidth: '560px',
      margin: '0 auto',
    },
    sectionHeader: {
      fontSize: '10px',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '3px',
      color: '#9ca3af',
      marginBottom: '14px',
      paddingBottom: '8px',
      borderBottom: '1px solid #e5e7eb',
    },
    section: {
      marginBottom: '32px',
    },
    expRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: '4px',
    },
    expRoleCompany: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#1f2937',
    },
    expCompanyMuted: {
      fontWeight: '400',
      color: '#9ca3af',
      marginLeft: '6px',
    },
    expDates: {
      fontSize: '11px',
      color: '#9ca3af',
    },
    expBullets: {
      fontSize: '12px',
      color: '#6b7280',
      whiteSpace: 'pre-line',
      marginTop: '8px',
      lineHeight: '1.7',
    },
    skillsText: {
      fontSize: '13px',
      color: '#374151',
      lineHeight: '1.8',
    },
    eduRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: '12px',
    },
    eduDegree: {
      fontSize: '13px',
      fontWeight: '600',
      color: '#1f2937',
    },
    eduInstitution: {
      fontSize: '11px',
      color: '#6b7280',
      marginTop: '2px',
    },
    eduYear: {
      fontSize: '11px',
      color: '#9ca3af',
    },
  };

  return (
    <div style={s.page}>
      <div style={s.headerCenter}>
        <div style={s.name}>{personalInfo.fullName || 'Your Name'}</div>
        <div style={s.title}>{personalInfo.jobTitle || 'Job Title'}</div>
        <div style={s.contactRow}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.links && <span>• {personalInfo.links}</span>}
        </div>
      </div>

      {summary && (
        <div style={s.summaryBlock}>
          <p style={s.summaryText}>{summary}</p>
        </div>
      )}

      {experience && experience.length > 0 && experience[0].company && (
        <div style={s.section}>
          <div style={s.sectionHeader}>Experience</div>
          {experience.map((exp, idx) => (
            <div key={idx} style={{ marginBottom: '20px' }}>
              <div style={s.expRow}>
                <div style={s.expRoleCompany}>
                  {exp.role}
                  {exp.company && <span style={s.expCompanyMuted}>at {exp.company}</span>}
                </div>
                <div style={s.expDates}>{exp.dates}</div>
              </div>
              {exp.bullets && <div style={s.expBullets}>{exp.bullets}</div>}
            </div>
          ))}
        </div>
      )}

      {skills && (
        <div style={s.section}>
          <div style={s.sectionHeader}>Skills</div>
          <div style={s.skillsText}>{skills}</div>
        </div>
      )}

      {education && education.length > 0 && education[0].institution && (
        <div style={s.section}>
          <div style={s.sectionHeader}>Education</div>
          {education.map((edu, idx) => (
            <div key={idx} style={s.eduRow}>
              <div>
                <div style={s.eduDegree}>{edu.degree}</div>
                <div style={s.eduInstitution}>{edu.institution}</div>
              </div>
              <div style={s.eduYear}>{edu.year}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * ExecutiveTemplate — 100% inline styles (no Tailwind)
 */
const ExecutiveTemplate = ({ data }) => {
  const { personalInfo, summary, skills, experience, education, settings } = data;
  const primaryColor = settings.color || '#1e293b';
  const fontFamily = settings.font || 'Inter';

  const s = {
    page: {
      width: '794px',
      minHeight: '1123px',
      backgroundColor: '#ffffff',
      fontFamily,
      display: 'flex',
      boxSizing: 'border-box',
    },
    sidebar: {
      width: '260px',
      minWidth: '260px',
      backgroundColor: primaryColor,
      padding: '40px 28px',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
    },
    sidebarName: {
      fontSize: '26px',
      fontWeight: '700',
      lineHeight: '1.2',
      marginBottom: '6px',
      color: '#ffffff',
    },
    sidebarTitle: {
      fontSize: '12px',
      fontWeight: '500',
      opacity: 0.85,
      marginBottom: '28px',
      color: '#ffffff',
    },
    sidebarContact: {
      fontSize: '11px',
      opacity: 0.85,
      marginBottom: '4px',
      wordBreak: 'break-word',
      color: '#ffffff',
    },
    sidebarSection: {
      marginTop: '28px',
    },
    sidebarSectionTitle: {
      fontSize: '10px',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      color: 'rgba(255,255,255,0.6)',
      marginBottom: '12px',
      paddingBottom: '8px',
      borderBottom: '1px solid rgba(255,255,255,0.15)',
    },
    sidebarSkillItem: {
      fontSize: '11px',
      color: 'rgba(255,255,255,0.85)',
      marginBottom: '6px',
    },
    sidebarEduDegree: {
      fontSize: '11px',
      fontWeight: '700',
      color: '#ffffff',
      marginBottom: '2px',
    },
    sidebarEduInstitution: {
      fontSize: '10px',
      color: 'rgba(255,255,255,0.7)',
    },
    sidebarEduYear: {
      fontSize: '10px',
      color: 'rgba(255,255,255,0.6)',
      marginTop: '2px',
    },
    main: {
      flex: 1,
      padding: '40px 32px',
      backgroundColor: '#f8fafc',
    },
    mainSectionTitle: {
      fontSize: '10px',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      color: '#64748b',
      marginBottom: '14px',
      paddingBottom: '8px',
      borderBottom: `2px solid ${primaryColor}`,
    },
    mainSection: {
      marginBottom: '32px',
    },
    summaryText: {
      fontSize: '13px',
      lineHeight: '1.7',
      color: '#475569',
    },
    expRole: {
      fontSize: '14px',
      fontWeight: '700',
      color: '#0f172a',
    },
    expCompany: {
      fontSize: '12px',
      fontWeight: '600',
      color: primaryColor,
      marginTop: '2px',
    },
    expDates: {
      fontSize: '10px',
      fontWeight: '500',
      color: '#64748b',
      backgroundColor: '#e2e8f0',
      padding: '2px 8px',
      borderRadius: '4px',
    },
    expEntry: {
      marginBottom: '20px',
    },
  };

  return (
    <div style={s.page}>
      {/* Sidebar */}
      <div style={s.sidebar}>
        <div style={s.sidebarName}>{personalInfo.fullName || 'Your Name'}</div>
        <div style={s.sidebarTitle}>{personalInfo.jobTitle || 'Job Title'}</div>

        <div style={{ marginBottom: '24px' }}>
          {personalInfo.email && <div style={s.sidebarContact}>{personalInfo.email}</div>}
          {personalInfo.phone && <div style={s.sidebarContact}>{personalInfo.phone}</div>}
          {personalInfo.links && <div style={s.sidebarContact}>{personalInfo.links}</div>}
        </div>

        {skills && (
          <div style={s.sidebarSection}>
            <div style={s.sidebarSectionTitle}>Expertise</div>
            {skills.split(',').map((skill, idx) => (
              <div key={idx} style={s.sidebarSkillItem}>• {skill.trim()}</div>
            ))}
          </div>
        )}

        {education && education.length > 0 && education[0].institution && (
          <div style={s.sidebarSection}>
            <div style={s.sidebarSectionTitle}>Education</div>
            {education.map((edu, idx) => (
              <div key={idx} style={{ marginBottom: '14px' }}>
                <div style={s.sidebarEduDegree}>{edu.degree}</div>
                <div style={s.sidebarEduInstitution}>{edu.institution}</div>
                <div style={s.sidebarEduYear}>{edu.year}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={s.main}>
        {summary && (
          <div style={s.mainSection}>
            <div style={s.mainSectionTitle}>Professional Summary</div>
            <p style={s.summaryText}>{summary}</p>
          </div>
        )}

        {experience && experience.length > 0 && experience[0].company && (
          <div style={s.mainSection}>
            <div style={s.mainSectionTitle}>Professional Experience</div>
            {experience.map((exp, idx) => (
              <div key={idx} style={s.expEntry}>
                <div style={s.expRole}>{exp.role}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '4px 0 8px' }}>
                  <div style={s.expCompany}>{exp.company}</div>
                  <div style={s.expDates}>{exp.dates}</div>
                </div>
                {exp.bullets && (
                  <ul style={{ paddingLeft: '16px', listStyle: 'disc' }}>
                    {exp.bullets.split('\n').filter(b => b.trim()).map((bullet, i) => (
                      <li key={i} style={{ fontSize: '12px', color: '#475569', marginBottom: '4px' }}>
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
    </div>
  );
};

/**
 * TemplateRenderer — picks the right template based on settings.
 */
const TemplateRenderer = ({ data }) => {
  switch (data.settings.template) {
    case 'modern':
      return <ModernTemplate data={data} />;
    case 'minimal':
      return <MinimalTemplate data={data} />;
    case 'executive':
      return <ExecutiveTemplate data={data} />;
    default:
      return <ModernTemplate data={data} />;
  }
};

export default TemplateRenderer;
