import type { Invitation, Template, CreateInvitationData, MusicTrack, CreateMusicTrackData, GalleryPhoto, CreateGalleryPhotoData } from '~/types/invitation'

interface JsonData {
  invitations: Invitation[]
  templates: Template[]
  music_tracks: MusicTrack[]
}

let jsonDataCache: JsonData | null = null

const loadJsonData = async (): Promise<JsonData> => {
  if (jsonDataCache) {
    return jsonDataCache
  }

  try {
    const response = await fetch('/invitations.json')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    jsonDataCache = data
    return data
  } catch (error) {
    console.error('Error loading JSON data:', error)
    return {
      invitations: [],
      templates: [],
      music_tracks: []
    }
  }
}

export const useInvitations = () => {
  const { user } = useAuth()

  const invitations = ref<Invitation[]>([])
  const templates = ref<Template[]>([])
  const musicTracks = ref<MusicTrack[]>([])
  const galleryPhotos = ref<GalleryPhoto[]>([])
  const loading = ref(false)

  const loadInvitations = async () => {
    loading.value = true
    try {
      const data = await loadJsonData()
      invitations.value = data.invitations || []
    } catch (error) {
      console.error('Error loading invitations:', error)
      invitations.value = []
    } finally {
      loading.value = false
    }
  }

  const loadTemplates = async () => {
    try {
      const data = await loadJsonData()
      templates.value = data.templates || []
    } catch (error) {
      console.error('Error loading templates:', error)
      templates.value = []
    }
  }

  const loadMusicTracks = async () => {
    try {
      const data = await loadJsonData()
      musicTracks.value = data.music_tracks || []
    } catch (error) {
      console.error('Error loading music tracks:', error)
      musicTracks.value = []
    }
  }

  const createMusicTrack = async (musicData: CreateMusicTrackData): Promise<MusicTrack | null> => {
    if (!user.value) return null
    
    try {
      // TODO: Implementar creación de música alternativa
      console.warn('Creación de música no implementada - Supabase eliminado')
      return null
    } catch (error) {
      console.error('Error creating music track:', error)
      return null
    }
  }

  const createInvitation = async (invitationData: CreateInvitationData): Promise<Invitation | null> => {
    if (!user.value) return null
    
    try {
      // TODO: Implementar creación de invitación alternativa
      console.warn('Creación de invitación no implementada - Supabase eliminado')
      return null
    } catch (error) {
      console.error('Error creating invitation:', error)
      return null
    }
  }

  const getInvitationByUrl = async (uniqueUrl: string): Promise<Invitation | null> => {
    try {
      const data = await loadJsonData()
      const invitation = data.invitations.find(inv => inv.unique_url === uniqueUrl && inv.is_active)
      
      if (!invitation) {
        return null
      }

      // Enriquecer la invitación con datos relacionados
      const enrichedInvitation: Invitation = { ...invitation }

      // Agregar música si existe
      if (invitation.music_id) {
        const music = data.music_tracks.find(m => m.id === invitation.music_id)
        if (music) {
          enrichedInvitation.music = music
        }
      }

      // Las fotos de galería ya vienen en el JSON si están incluidas
      if (!enrichedInvitation.gallery_photos && invitation.id) {
        // Si no vienen en el JSON, buscar por invitation_id
        enrichedInvitation.gallery_photos = []
      }

      return enrichedInvitation
    } catch (error) {
      console.error('Error loading invitation:', error)
      return null
    }
  }

  const updateInvitation = async (id: string, invitationData: Partial<CreateInvitationData>): Promise<Invitation | null> => {
    if (!user.value) return null
    
    try {
      // TODO: Implementar actualización de invitación alternativa
      console.warn('Actualización de invitación no implementada - Supabase eliminado')
      return null
    } catch (error) {
      console.error('Error:', error)
      throw error
    }
  }

  const deleteInvitation = async (id: string): Promise<boolean> => {
    try {
      // TODO: Implementar eliminación de invitación alternativa
      console.warn('Eliminación de invitación no implementada - Supabase eliminado')
      invitations.value = invitations.value.filter(inv => inv.id !== id)
      return true
    } catch (error) {
      console.error('Error deleting invitation:', error)
      return false
    }
  }

  const generateUniqueUrl = (): string => {
    return 'inv-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
  }

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatDateTime = (dateString: string | undefined): string => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Funciones para la galería de fotos
  const loadGalleryPhotos = async (invitationId: string): Promise<GalleryPhoto[]> => {
    try {
      const data = await loadJsonData()
      const invitation = data.invitations.find(inv => inv.id === invitationId)
      return invitation?.gallery_photos || []
    } catch (error) {
      console.error('Error loading gallery photos:', error)
      return []
    }
  }

  const createGalleryPhoto = async (photoData: CreateGalleryPhotoData): Promise<GalleryPhoto | null> => {
    if (!user.value) return null
    
    try {
      // TODO: Implementar creación de foto de galería alternativa
      console.warn('Creación de foto de galería no implementada - Supabase eliminado')
      return null
    } catch (error) {
      console.error('Error creating gallery photo:', error)
      return null
    }
  }

  const updateGalleryPhoto = async (id: string, photoData: Partial<CreateGalleryPhotoData>): Promise<GalleryPhoto | null> => {
    if (!user.value) return null
    
    try {
      // TODO: Implementar actualización de foto de galería alternativa
      console.warn('Actualización de foto de galería no implementada - Supabase eliminado')
      return null
    } catch (error) {
      console.error('Error updating gallery photo:', error)
      return null
    }
  }

  const deleteGalleryPhoto = async (id: string): Promise<boolean> => {
    if (!user.value) return false
    
    try {
      // TODO: Implementar eliminación de foto de galería alternativa
      console.warn('Eliminación de foto de galería no implementada - Supabase eliminado')
      invitations.value.forEach(invitation => {
        if (invitation.gallery_photos) {
          invitation.gallery_photos = invitation.gallery_photos.filter(photo => photo.id !== id)
        }
      })
      return true
    } catch (error) {
      console.error('Error deleting gallery photo:', error)
      return false
    }
  }

  return {
    invitations: readonly(invitations),
    templates: readonly(templates),
    musicTracks: readonly(musicTracks),
    galleryPhotos: readonly(galleryPhotos),
    loading: readonly(loading),
    loadInvitations,
    loadTemplates,
    loadMusicTracks,
    createMusicTrack,
    createInvitation,
    updateInvitation,
    getInvitationByUrl,
    deleteInvitation,
    loadGalleryPhotos,
    createGalleryPhoto,
    updateGalleryPhoto,
    deleteGalleryPhoto,
    formatDate,
    formatDateTime
  }
}
