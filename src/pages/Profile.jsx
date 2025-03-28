import { useAuth } from '../contexts/AuthContext';
import LogoutButton from '../components/LogoutButton';

const Profile = () => {
  const { currentUser } = useAuth();
  
  // Get the user's display name or email
  const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User';
  const email = currentUser?.email || 'Not available';
  const photoURL = currentUser?.photoURL;
  
  // Get the first two letters of the displayName for the avatar
  const initials = displayName.substring(0, 2).toUpperCase();
  
  return (
    <div className="profile-container">
      <h1 className="heading-1 mb-4">Your Profile</h1>
      
      <div className="profile-section">
        <div className="profile-header">
          {photoURL ? (
            <img 
              src={photoURL} 
              alt={displayName} 
              className="profile-avatar"
            />
          ) : (
            <div className="profile-avatar-placeholder">
              {initials}
            </div>
          )}
          <div>
            <h2 className="heading-2">{displayName}</h2>
            <p className="text-gray-500">{email}</p>
          </div>
        </div>
        
        <div className="profile-info-section">
          <h3 className="text-lg font-medium mb-2">Account Information</h3>
          <div className="profile-info-row">
            <span className="info-label">Email</span>
            <span className="info-value">{email}</span>
          </div>
          <div className="profile-info-row">
            <span className="info-label">Member Since</span>
            <span className="info-value">
              {currentUser?.metadata?.creationTime ? 
                new Date(currentUser.metadata.creationTime).toLocaleDateString() : 
                'Not available'}
            </span>
          </div>
        </div>
        
        <div className="profile-info-section">
          <h3 className="text-lg font-medium mb-2">Training Preferences</h3>
          <div className="profile-info-row">
            <span className="info-label">Primary Event</span>
            <span className="info-value">100m Dash</span>
          </div>
          <div className="profile-info-row">
            <span className="info-label">Training Goal</span>
            <span className="info-value">Performance</span>
          </div>
          <div className="profile-info-row">
            <span className="info-label">Weekly Target</span>
            <span className="info-value">5 Sessions</span>
          </div>
        </div>
        
        <div className="profile-info-section account-actions">
          <h3 className="text-lg font-medium mb-2">Account Actions</h3>
          <button className="btn btn-outline mb-2 w-full">
            Edit Profile
          </button>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Profile; 