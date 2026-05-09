// Permission system for role-based access control

export const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  return user.role || 'guest'
}

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user') || '{}')
}

export const isAdmin = () => {
  return getUserRole() === 'admin'
}

export const isLoggedIn = () => {
  return !!localStorage.getItem('token')
}

// Permission checks
export const canEditDonors = () => {
  return isAdmin()
}

export const canDeleteDonors = () => {
  return isAdmin()
}

export const canViewDonorDetails = () => {
  return isLoggedIn() // All logged-in users can view basic details
}

export const canEditRequests = () => {
  return isAdmin()
}

export const canViewAnalytics = () => {
  return isAdmin()
}

export const canManageBloodBanks = () => {
  return isAdmin()
}

export const canViewFullProfile = () => {
  return isAdmin()
}

// UI Permission helpers
export const showAdminFeatures = () => {
  return isAdmin()
}

export const showEditButtons = () => {
  return isAdmin()
}

export const showDeleteButtons = () => {
  return isAdmin()
}

export const getPermissionLevel = () => {
  const role = getUserRole()
  
  switch (role) {
    case 'admin':
      return {
        canEdit: true,
        canDelete: true,
        canViewAll: true,
        canManage: true,
        level: 'full'
      }
    case 'hospital':
    case 'bloodbank':
      return {
        canEdit: false,
        canDelete: false,
        canViewAll: true,
        canManage: false,
        level: 'view'
      }
    case 'donor':
      return {
        canEdit: false,
        canDelete: false,
        canViewAll: false,
        canManage: false,
        level: 'basic'
      }
    default:
      return {
        canEdit: false,
        canDelete: false,
        canViewAll: false,
        canManage: false,
        level: 'guest'
      }
  }
}