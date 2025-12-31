import { ReactComponent as Icon } from '../assets/code-svgrepo-com.svg';

function UniversityCard(){
  const styles = {
    card: {
      backgroundColor: 'rgba(13, 13, 13, 0.6)',
      backdropFilter: 'blur(1px)',
      boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1), 30px 20px 70px rgba(0, 0, 0, 0.4)',
      
      color: '#ffffff',
      padding: '32px',
      borderRadius: '16px',
      width: '380px',
      fontFamily: 'JetBrainsBold',
      border: '1px solid #1a1a1a',
      position: 'relative',
    },
    caption: {
      fontFamily: 'JetBrainsThin',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '24px',
    },
    iconContainer: {
      backgroundColor: '#161b22',
      padding: '12px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #21262d',
    },
    badge: {
      backgroundColor: 'rgba(0, 128, 0, 0.1)',
      color: '#4ade80',
      fontSize: '10px',
      fontWeight: 'bold',
      padding: '4px 8px',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      letterSpacing: '1px',
    },
    dot: {
      width: '6px',
      height: '6px',
      backgroundColor: '#4ade80',
      borderRadius: '50%',
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      margin: '0 0 4px 0',
    },
    subtitle: {
      color: '#6e7681',
      fontFamily: 'JetBrains',
      fontSize: '18px',
      margin: '0 0 32px 0',
    },
    infoSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      marginBottom: '40px',
    },
    infoItem: {
      display: 'flex',
      gap: '16px',
    },
    bullet: {
      color: '#0c4196',
      fontSize: '20px',
      marginTop: '-4px',
    },
    label: {
      color: '#6e7681',
      fontSize: '12px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      marginBottom: '4px',
    },
    value: {
      fontSize: '20px',
      fontWeight: '500',
    },
    divider: {
      border: 'none',
      borderTop: '1px solid #21262d',
      marginBottom: '24px',
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    gpa: {
      color: '#484f58',
      fontSize: '16px',
    },
    link: {
      color: '#0c4196',
      textDecoration: 'none',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    }
  };

  return (
    <div style={styles.card}>
      {/* Top Section */}
      <div style={styles.header}>
        <div style={styles.iconContainer}>
          <Icon width={24} height={24} fill='#0c4196' />
        </div>
        <div style={styles.badge}>
          <div style={styles.dot}></div>
          CURRENT
        </div>
      </div>

      {/* University Title */}
      <h2 style={styles.title}>Brock University</h2>
      <p style={styles.subtitle}>Bachelor Of Science</p>

      {/* Details List */}
      <div style={styles.infoSection}>
        <div style={styles.infoItem}>
          <span style={styles.bullet}>•</span>
          <div>
            <div style={styles.label}>Degree</div>
            <div style={styles.caption}>Computer Science (Honours) Co-op</div>
          </div>
        </div>
        
        <div style={styles.infoItem}>
          <span style={styles.bullet}>•</span>
          <div>
            <div style={styles.label}>Focus</div>
            <div style={styles.caption}>Software Engineering</div>
          </div>
        </div>

        <div style={styles.infoItem}>
          <span style={styles.bullet}>•</span>
          <div>
            <div style={styles.label}>Graduation</div>
            <div style={styles.caption}>Class of 2029</div>
          </div>
        </div>
      </div>

      <hr style={styles.divider} />

      {/* Footer */}
      <div style={styles.footer}>
        <span style={styles.gpa}>GPA 3.91</span>
        <a href="#" style={styles.link}>
          Transcript <span>→</span>
        </a>
      </div>
    </div>
  );
};

export default UniversityCard;