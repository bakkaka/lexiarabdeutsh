export default function Home() {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      marginTop: '50px'
    }}>
      <h1>LexiPro - Dictionnaire Allemand-Arabe</h1>
      <p>Application en cours de développement...</p>
      <div style={{ 
        backgroundColor: '#f0f8ff', 
        padding: '20px', 
        borderRadius: '10px',
        marginTop: '20px'
      }}>
        <h2>Fonctionnalités :</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>✅ 6M+ mots allemand-arabe</li>
          <li>✅ 100% Offline</li>
          <li>✅ Recherche instantanée</li>
          <li>✅ Synonymes et exemples</li>
        </ul>
      </div>
    </div>
  );
}