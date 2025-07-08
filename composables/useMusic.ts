import { ref, readonly } from 'vue'
import type { MusicTrack } from '~/types/invitation'

export const useMusic = () => {
  const loading = ref(false)
  const musicTracks = ref<MusicTrack[]>([])
  
  // Cargar música desde la base de datos
  const loadMusicTracks = async () => {
    loading.value = true
    try {
      // TODO: Implementar carga de música alternativa
      console.warn('Carga de música no implementada - Supabase eliminado')
      musicTracks.value = []
    } catch (error) {
      console.error('Error loading music tracks:', error)
      musicTracks.value = []
    } finally {
      loading.value = false
    }
  }

  // Obtener música predefinida
  const getPredefinedMusic = () => {
    return musicTracks.value.filter(track => track.type === 'predefined')
  }

  // Obtener música personalizada del usuario
  const getCustomMusic = () => {
    return musicTracks.value.filter(track => track.type === 'custom')
  }

  // Subir archivo de música personalizado
  const uploadCustomMusic = async (file: File): Promise<MusicTrack | null> => {
    loading.value = true
    try {
      // Validar tipo de archivo
      const allowedTypes = ['audio/mp3', 'audio/mpeg', 'audio/wav', 'audio/ogg']
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Tipo de archivo no permitido. Solo se permiten archivos MP3, WAV y OGG.')
      }

      // Validar tamaño (máximo 10MB)
      const maxSize = 10 * 1024 * 1024 // 10MB
      if (file.size > maxSize) {
        throw new Error('El archivo es demasiado grande. Tamaño máximo: 10MB.')
      }

      // TODO: Implementar subida de música alternativa
      console.warn('Subida de música no implementada - Supabase eliminado')
      return null
    } catch (error) {
      console.error('Error uploading music:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // Validar archivo de audio
  const validateAudioFile = (file: File): { valid: boolean; error?: string } => {
    const allowedTypes = ['audio/mp3', 'audio/mpeg', 'audio/wav', 'audio/ogg']
    const maxSize = 10 * 1024 * 1024 // 10MB

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Tipo de archivo no permitido. Solo se permiten archivos MP3, WAV y OGG.'
      }
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'El archivo es demasiado grande. Tamaño máximo: 10MB.'
      }
    }

    return { valid: true }
  }

  // Formatear duración de audio
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // Obtener información del archivo de audio
  const getAudioInfo = (file: File): Promise<{ duration: number; name: string }> => {
    return new Promise((resolve, reject) => {
      const audio = new Audio()
      const url = URL.createObjectURL(file)
      
      audio.onloadedmetadata = () => {
        URL.revokeObjectURL(url)
        resolve({
          duration: audio.duration,
          name: file.name.replace(/\.[^/.]+$/, "")
        })
      }
      
      audio.onerror = () => {
        URL.revokeObjectURL(url)
        reject(new Error('No se pudo cargar el archivo de audio'))
      }
      
      audio.src = url
    })
  }

  // Eliminar música personalizada
  const deleteCustomMusic = async (musicId: string): Promise<boolean> => {
    try {
      // TODO: Implementar eliminación de música alternativa
      console.warn('Eliminación de música no implementada - Supabase eliminado')
      musicTracks.value = musicTracks.value.filter(track => track.id !== musicId)
      return true
    } catch (error) {
      console.error('Error deleting music track:', error)
      return false
    }
  }

  return {
    loading,
    musicTracks: readonly(musicTracks),
    loadMusicTracks,
    getPredefinedMusic,
    getCustomMusic,
    uploadCustomMusic,
    validateAudioFile,
    formatDuration,
    getAudioInfo,
    deleteCustomMusic
  }
}
