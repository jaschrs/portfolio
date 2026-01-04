const TerminalCard = () => {
  return (
    <div style={styles.window}>
      {/* Terminal Header - Background color kept intact */}
      <div style={styles.header}>
        <span style={styles.headerText}>user@dev:~/stats</span>
        <div style={styles.dotContainer}>
          <div style={styles.dot}></div>
          <div style={styles.dot}></div>
        </div>
      </div>

      {/* Terminal Body - Now transparent */}
      <div style={styles.body}>
        <div style={styles.line}>
          <span style={styles.prompt}>$</span>
          <span style={styles.command}> cat profile.json</span>
        </div>

        <div style={styles.jsonContent}>
          <div>{'{'}</div>
          <div style={styles.indent}>
            <span style={styles.key}>"location"</span>: <span style={styles.string}>"Ontario, CA"</span>,
          </div>
          <div style={styles.indent}>
            <span style={styles.key}>"education"</span>: <span style={styles.string}>"B.Sc Computer Science"</span>,
          </div>
          <div style={styles.indent}>
            <span style={styles.key}>"gpa"</span>: <span style={styles.number}>3.9</span>,
          </div>
          <div style={styles.indent}>
            <span style={styles.key}>"status"</span>: <span style={styles.string}>"Open to work"</span>,
          </div>
          <div style={styles.indent}>
            <span style={styles.key}>"interests"</span>: [
          </div>
          <div style={styles.doubleIndent}>
            <span style={styles.string}>"Distributed Systems"</span>,
          </div>
          <div style={styles.doubleIndent}>
            <span style={styles.string}>"AI/ML"</span>
          </div>
          <div style={styles.indent}>]</div>
          <div>{'}'}</div>
        </div>

        {/* Blinking Cursor Line */}
        <div style={{ ...styles.line, marginTop: '20px' }}>
          <span style={styles.prompt}>$</span>
          <span style={styles.cursor}></span>
        </div>
      </div>

      {/* Injecting Keyframes for Cursor */}
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  window: {
    // Changed background to transparent
    backgroundColor: 'transparent',
    // Added a border so the terminal shape is visible against any background
    border: '1px solid #21262d',
    borderRadius: '8px',
    overflow: 'hidden',
    width: '600px',
    fontFamily: 'Jetbrains',
    // Removed heavy shadow as it looks unnatural on a fully transparent object
    // boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
    color: '#E0E0E0',
    fontSize: '15px',
  },
  header: {
    // Header background kept intact
    backgroundColor: '#161B22',
    padding: '10px 15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #21262d',
  },
  headerText: {
    color: '#8B949E',
    fontSize: '13px',
  },
  dotContainer: {
    display: 'flex',
    gap: '8px',
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#30363D',
  },
  body: {
    padding: '25px',
    lineHeight: '1.6',
    // Ensure body is also transparent
    backgroundColor: 'transparent',
  },
  prompt: {
    color: '#D19A66',
    marginRight: '10px',
  },
  command: {
    color: '#FFFFFF',
  },
  jsonContent: {
    marginTop: '15px',
    color: '#FFFFFF',
  },
  indent: {
    paddingLeft: '20px',
  },
  doubleIndent: {
    paddingLeft: '40px',
  },
  key: {
    color: '#FFFFFF',
  },
  string: {
    color: '#27A768',
  },
  number: {
    color: '#D19A66',
  },
  cursor: {
    display: 'inline-block',
    width: '10px',
    height: '18px',
    backgroundColor: '#8B949E',
    marginLeft: '10px',
    verticalAlign: 'middle',
    animation: 'blink 1s step-end infinite',
  },
};

export default TerminalCard;