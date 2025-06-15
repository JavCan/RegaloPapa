import React from 'react';
import './LockedPhoto.css';
import familyPhoto from '../assets/familia.jpg'; // Asegúrate que la ruta es correcta

function LockedPhoto({ isUnlocked }) {
  return (
    <div className={`locked-photo-container ${isUnlocked ? 'unlocked' : ''}`}>
      <img src={familyPhoto} alt="Foto Familiar" className="family-photo" />
      {!isUnlocked && (
        <div className="lock-overlay">
          <span className="lock-icon" role="img" aria-label="candado">🔒</span>
        </div>
      )}
    </div>
  );
}

export default LockedPhoto;