<template>
  <div class="d-flex justify-content-center align-items-center" style="height: 100vh;" v-if="loading">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-if="invitation" :style="invitationStyles">
    <!-- music player -->
    <div v-if="invitation.music && invitation.music.url" class="music-player-container">
      <div class="music-player">
        <div class="music-controls">
          <button @click="toggleMusic" class="btn btn-sm rounded-circle me-2"
            :style="{ backgroundColor: primaryColor, borderColor: primaryColor }"
            :title="isPlaying ? 'Pausar música' : 'Reproducir música'">
            <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
          </button>
          <div class="music-info">
            <small class="d-block" :style="{ color: textColor }">{{ invitation.music.name
              }}</small>
          </div>
          <button @click="toggleMute" class="btn btn-outline-secondary btn-sm rounded-circle ms-2"
            :title="isMuted ? 'Activar sonido' : 'Silenciar'">
            <i :class="isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up'"></i>
          </button>
        </div>
        <audio ref="audioPlayer" :src="invitation.music.url" loop preload="metadata" @loadeddata="onAudioLoaded"
          @play="isPlaying = true" @pause="isPlaying = false" @ended="isPlaying = false" @error="onAudioError" />
      </div>
    </div>

    <!-- Navbar start -->
    <!-- <div class="container-fluid sticky-top px-0">
        <div class="container-fluid">
          <div class="container px-0">
            <nav class="navbar navbar-light navbar-expand-xl px-md-0" id="navBar">
              <button class="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse">
                <span class="fa fa-bars text-primary"></span>
              </button>
              <div class="collapse navbar-collapse py-3" id="navbarCollapse">
                <div class="navbar-nav me-auto border-top">
                  <a href="#weddingHome" class="nav-item nav-link active">Inicio</a>
                  <a href="#weddingAbout" class="nav-item nav-link">Sobre nosotros</a>
                  <a href="#weddingTimeline" class="nav-item nav-link">Itinerario de actividades</a>
                  <a href="#weddingGallery" class="nav-item nav-link">Galeria</a>
                  <a :href="whatsappUrl" target="_blank" class="nav-item nav-link"><i class="fab fa-whatsapp"></i>
                    Confirmar asistencia</a>
        </div>
              </div>
            </nav>
          </div>
        </div>
      </div> -->
    <!-- Navbar End -->

    <div class="container-fluid carousel-header px-0">
      <div id="carouselId" class="carousel slide" data-bs-ride="carousel">
        <ol class="carousel-indicators">
          <li v-for="(img, idx) in invitation.carousel_images" :key="img" :data-bs-target="'#carouselId'"
            :data-bs-slide-to="idx" :class="{ active: idx === 0 }"></li>
        </ol>
        <div class="carousel-inner" role="listbox">
          <template v-for="(img, idx) in invitation.carousel_images" :key="img">
            <div :class="['carousel-item', { active: idx === 0 }]">
              <img :src="img" class="img-fluid" alt="Imagen carrusel">
              <div class="carousel-caption">
                <div class="p-3 mx-auto animated zoomIn" style="max-width: 900px;">
                  <div class="d-inline-block border-end-0 border-start-0 border-secondary p-2 mb-4"
                    style="border-style: double;">
                    <h4 class="text-white text-uppercase fw-bold mb-0" style="letter-spacing: 3px;">Nos casamos</h4>
                  </div>
                  <h1 class="display-1 text-capitalize text-white mb-3 elegant-name" style="font-size: 3.5rem;">{{
                    invitation.bride_name }} <i class="fa fa-heart" style="color: #fd5d5d;"></i> {{
                      invitation.groom_name }}</h1>
                  <div class="d-inline-block border-end-0 border-start-0 border-secondary p-2 mb-5"
                    style="border-style: double;">
                    <h4 class="text-white text-uppercase fw-bold mb-0" style="letter-spacing: 3px;"> {{
                      formatDate(invitation.event_date) }}</h4>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
        <button v-if="invitation.carousel_images && invitation.carousel_images.length > 1" class="carousel-control-prev"
          type="button" data-bs-target="#carouselId" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button v-if="invitation.carousel_images && invitation.carousel_images.length > 1" class="carousel-control-next"
          type="button" data-bs-target="#carouselId" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>

    <!-- Bible Verse Section -->
    <div v-if="invitation.bible_verse" class="container-fluid position-relative py-5 section-bg">
      <div class="position-absolute leaf-decoration" style="top: 20px; left: 10%; transform: rotate(-30deg);"><i
          class="fas fa-leaf"></i></div>
      <div class="position-absolute leaf-decoration" style="bottom: 20px; right: 15%; transform: rotate(45deg);"><i
          class="fas fa-leaf"></i></div>
      <div class="container position-relative py-4">
        <div class="mx-auto text-center wow fadeInUp" data-wow-delay="0.1s" style="max-width: 800px;">
          <div class="p-4 rounded"
            :style="{ borderStyle: 'double', border: `15px solid ${primaryColor}40`, backgroundColor: 'white', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }">
            <p class="fs-5 mb-0 fst-italic elegant-body"
              :style="{ color: textColor, lineHeight: '1.8', fontSize: '1.2rem' }">
              "{{ invitation.bible_verse }}"
            </p>
            <p v-if="invitation.bible_reference" class="mt-3 mb-0 fw-bold elegant-heading"
              :style="{ color: primaryColor, fontSize: '1.1rem' }">
              {{ invitation.bible_reference }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Invitation Message Section -->
    <div v-if="invitation.invitation_message" class="container-fluid position-relative py-5 section-bg">
      <div class="position-absolute leaf-decoration" style="top: 30px; right: 10%; transform: rotate(60deg);"><i
          class="fas fa-leaf"></i></div>
      <div class="container position-relative py-4">
        <div class="mx-auto text-center wow fadeInUp" data-wow-delay="0.2s" style="max-width: 900px;">
          <h1 class="display-3 mb-4 elegant-name" :style="{ color: primaryColor, fontSize: '3.5rem' }">
            {{ invitation.bride_name }} & {{ invitation.groom_name }}
          </h1>
          <p class="lead fs-4 elegant-body" :style="{ color: textColor, lineHeight: '1.8', fontSize: '1.3rem' }">
            {{ invitation.invitation_message }}
          </p>
        </div>
      </div>
    </div>

    <!-- Music Player Section (Improved) -->
    <div v-if="invitation.music && invitation.music.url" class="container-fluid position-relative py-4 section-bg">
      <div class="container position-relative">
        <div class="mx-auto text-center wow fadeInUp" data-wow-delay="0.3s" style="max-width: 600px;">
          <h4 class="mb-3 elegant-heading" :style="{ color: textColor, fontSize: '1.3rem' }">Dale play a nuestra canción
          </h4>
          <div class="d-flex justify-content-center align-items-center gap-3 mb-3">
            <button @click="skipBackward" class="btn btn-sm rounded-circle"
              :style="{ backgroundColor: primaryColor, borderColor: primaryColor, color: 'white' }">
              <i class="fas fa-backward"></i>
            </button>
            <button @click="toggleMusic" class="btn btn-lg rounded-circle"
              :style="{ backgroundColor: primaryColor, borderColor: primaryColor, color: 'white', width: '60px', height: '60px' }">
              <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
            </button>
            <button @click="skipForward" class="btn btn-sm rounded-circle"
              :style="{ backgroundColor: primaryColor, borderColor: primaryColor, color: 'white' }">
              <i class="fas fa-forward"></i>
            </button>
          </div>
          <div class="d-flex justify-content-center align-items-center gap-2">
            <p class="mb-0 small" :style="{ color: textColor }">{{ invitation.music.name }}</p>
            <button @click="toggleMute" class="btn btn-sm rounded-circle"
              :style="{ borderColor: primaryColor, color: primaryColor }"
              :title="isMuted ? 'Activar sonido' : 'Silenciar'">
              <i :class="isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up'"></i>
            </button>
          </div>
          <audio ref="audioPlayer" :src="invitation.music.url" loop preload="metadata" @loadeddata="onAudioLoaded"
            @play="isPlaying = true" @pause="isPlaying = false" @ended="isPlaying = false" @error="onAudioError" />
        </div>
      </div>
    </div>

    <!-- Countdown Timer Section -->
    <div class="container-fluid countdown-section position-relative py-5">
      <div class="countdown-background"></div>
      <div class="container py-5 position-relative">
        <div class="countdown-container">
          <div class="countdown-item">
            <div class="countdown-number">{{ countdown.days }}</div>
            <div class="countdown-label">DÍAS</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-number">{{ countdown.hours }}</div>
            <div class="countdown-label">HORAS</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-number">{{ countdown.minutes }}</div>
            <div class="countdown-label">MINUTOS</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-number">{{ countdown.seconds }}</div>
            <div class="countdown-label">SEGUNDOS</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Countdown Timer End -->

    <!-- Wedding Timeline start -->
    <div class="container-fluid wedding-timeline position-relative overflow-hidden py-5 section-bg"
      id="weddingTimeline">
      <div class="position-absolute leaf-decoration" style="top: 30px; left: 8%; transform: rotate(-25deg);"><i
          class="fas fa-leaf"></i></div>
      <div class="position-absolute leaf-decoration" style="bottom: 40px; right: 10%; transform: rotate(55deg);"><i
          class="fas fa-leaf"></i></div>
      <div class="container py-5">
        <div class="text-center mb-5">
          <h1 class="display-3 mb-4 elegant-name" :style="{ color: primaryColor, fontSize: '3.5rem' }">
            Itinerario de actividades
          </h1>
          <p class="elegant-body" :style="{ color: textColor, fontSize: '1.1rem', opacity: '0.8' }">Planificación de la
            boda
          </p>
        </div>
        <div class="position-relative wedding-content">
          <div v-if="weddingTimeline.length > 0" class="timeline-container">
            <div class="timeline-line"></div>
            <div v-for="(event, index) in weddingTimeline" :key="event.id" class="timeline-item wow fadeInUp"
              :class="{ 'timeline-item-left': index % 2 === 0, 'timeline-item-right': index % 2 === 1 }"
              :data-wow-delay="`${0.1 + index * 0.1}s`">
              <div class="timeline-dot">
                <i :class="`fas ${event.icon || 'fa-calendar'}`"></i>
              </div>
              <div class="timeline-content">
                <div class="timeline-text">
                  <div class="timeline-time" :style="{ color: textColor }">{{ event.time }}</div>
                  <h3 class="timeline-title elegant-heading" :style="{ color: textColor }">{{ event.title }}</h3>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-5">
            <div class="mb-4">
              <i class="fas fa-calendar" :style="{ color: primaryColor, fontSize: '4rem' }"></i>
            </div>
            <h3 class="elegant-heading" :style="{ color: textColor }">Planificación de la boda próximamente</h3>
            <p class="elegant-body" :style="{ color: textColor, opacity: '0.7' }">Los detalles del cronograma se
              publicarán
              pronto</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Wedding Timeline End -->

    <!-- Religious Ceremony & Reception Details -->
    <div class="container-fluid position-relative py-5 section-bg">
      <div class="position-absolute leaf-decoration" style="top: 40px; left: 5%; transform: rotate(-20deg);"><i
          class="fas fa-leaf"></i></div>
      <div class="position-absolute leaf-decoration" style="bottom: 30px; right: 8%; transform: rotate(50deg);"><i
          class="fas fa-leaf"></i></div>
      <div class="container position-relative py-5">
        <div class="row g-4">
          <!-- Religious Ceremony -->
          <div v-if="invitation.religious_ceremony" class="col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div class="p-4 rounded h-100"
              :style="{ borderStyle: 'double', border: `10px solid ${primaryColor}40`, backgroundColor: 'white', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }">
              <div class="d-flex align-items-center mb-3">
                <i class="fas fa-church fa-2x me-3" :style="{ color: primaryColor }"></i>
                <h3 class="mb-0 elegant-heading" :style="{ color: textColor, fontSize: '1.5rem' }">Ceremonia religiosa
                </h3>
              </div>
              <p class="fw-bold mb-2 elegant-body" :style="{ color: textColor, fontSize: '1.1rem' }">{{
                invitation.religious_ceremony.location }}</p>
              <p class="mb-3 elegant-body" :style="{ color: textColor, fontSize: '1rem' }">{{
                invitation.religious_ceremony.address }}</p>
              <a v-if="invitation.religious_ceremony.maps_url" :href="invitation.religious_ceremony.maps_url"
                target="_blank" class="btn btn-sm"
                :style="{ backgroundColor: primaryColor, borderColor: primaryColor, color: 'white' }">
                <i class="fas fa-map-marker-alt me-2"></i>Ver ubicación
              </a>
            </div>
          </div>
          <!-- Reception -->
          <div v-if="invitation.reception" class="col-md-6 wow fadeInUp" data-wow-delay="0.2s">
            <div class="p-4 rounded h-100"
              :style="{ borderStyle: 'double', border: `10px solid ${primaryColor}40`, backgroundColor: 'white', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }">
              <div class="d-flex align-items-center mb-3">
                <i class="fas fa-building fa-2x me-3" :style="{ color: primaryColor }"></i>
                <h3 class="mb-0 elegant-heading" :style="{ color: textColor, fontSize: '1.5rem' }">Recepción</h3>
              </div>
              <p class="fw-bold mb-2 elegant-body" :style="{ color: textColor, fontSize: '1.1rem' }">{{
                invitation.reception.location }}</p>
              <p class="mb-3 elegant-body" :style="{ color: textColor, fontSize: '1rem' }">{{
                invitation.reception.address
              }}</p>
              <a v-if="invitation.reception.maps_url" :href="invitation.reception.maps_url" target="_blank"
                class="btn btn-sm"
                :style="{ backgroundColor: primaryColor, borderColor: primaryColor, color: 'white' }">
                <i class="fas fa-map-marker-alt me-2"></i>Ver ubicación
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dress Code Section -->
    <div v-if="invitation.dress_code" class="container-fluid position-relative py-5 section-bg">
      <div class="position-absolute leaf-decoration" style="top: 25px; right: 12%; transform: rotate(35deg);"><i
          class="fas fa-leaf"></i></div>
      <div class="container position-relative py-5">
        <div class="mx-auto text-center wow fadeInUp" data-wow-delay="0.1s" style="max-width: 800px;">
          <h2 class="display-5 mb-4 elegant-name" :style="{ color: primaryColor, fontSize: '2rem' }">Código de
            vestimenta
          </h2>
          <div class="dress-code-box p-5"
            :style="{ border: `1px solid rgba(107, 142, 90, 0.3)`, backgroundColor: 'white', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }">
            <div class="row g-4">
              <div class="col-md-6">
                <div class="dress-code-gender">
                  <div class="dress-code-icon mb-3">
                    <i class="fas fa-user-tie" :style="{ color: primaryColor, fontSize: '2.5rem' }"></i>
                  </div>
                  <h4 class="dress-code-gender-title elegant-heading mb-3"
                    :style="{ color: textColor, fontSize: '1.2rem' }">Caballeros</h4>
                  <ul class="dress-code-list elegant-body"
                    :style="{ color: textColor, fontSize: '1rem', textAlign: 'left', listStyle: 'none', padding: 0 }">
                    <li v-if="invitation.dress_code.toLowerCase() === 'formal'" class="mb-2">
                      <i class="fas fa-check-circle me-2" :style="{ color: primaryColor, fontSize: '0.85rem' }"></i>
                      Traje completo (saco y pantalón)
                    </li>
                    <li v-if="invitation.dress_code.toLowerCase() === 'formal'" class="mb-2">
                      <i class="fas fa-check-circle me-2" :style="{ color: primaryColor, fontSize: '0.85rem' }"></i>
                      Camisa formal
                    </li>
                    <li v-if="invitation.dress_code.toLowerCase() === 'formal'" class="mb-2">
                      <i class="fas fa-check-circle me-2" :style="{ color: primaryColor, fontSize: '0.85rem' }"></i>
                      Corbata o corbatín
                    </li>
                    <li v-if="invitation.dress_code.toLowerCase() === 'formal'" class="mb-2">
                      <i class="fas fa-check-circle me-2" :style="{ color: primaryColor, fontSize: '0.85rem' }"></i>
                      Zapatos formales
                    </li>
                    <li
                      v-if="invitation.dress_code.toLowerCase() === 'semi-formal' || invitation.dress_code.toLowerCase() === 'semi formal'"
                      class="mb-2">
                      <i class="fas fa-check-circle me-2" :style="{ color: primaryColor, fontSize: '0.85rem' }"></i>
                      Traje o blazer
                    </li>
                    <li
                      v-if="invitation.dress_code.toLowerCase() === 'semi-formal' || invitation.dress_code.toLowerCase() === 'semi formal'"
                      class="mb-2">
                      <i class="fas fa-check-circle me-2" :style="{ color: primaryColor, fontSize: '0.85rem' }"></i>
                      Camisa de vestir
                    </li>
                    <li v-if="invitation.dress_code.toLowerCase() === 'casual'" class="mb-2">
                      <i class="fas fa-check-circle me-2" :style="{ color: primaryColor, fontSize: '0.85rem' }"></i>
                      Pantalón de vestir
                    </li>
                    <li v-if="invitation.dress_code.toLowerCase() === 'casual'" class="mb-2">
                      <i class="fas fa-check-circle me-2" :style="{ color: primaryColor, fontSize: '0.85rem' }"></i>
                      Camisa o polo
                    </li>
                  </ul>
                </div>
              </div>
              <!-- Women's Dress Code -->
              <div class="col-md-6">
                <div class="dress-code-gender">
                  <div class="dress-code-icon mb-3">
                    <i class="fas fa-female" :style="{ color: primaryColor, fontSize: '2.5rem' }"></i>
                  </div>
                  <h4 class="dress-code-gender-title elegant-heading mb-3"
                    :style="{ color: textColor, fontSize: '1.2rem' }">Damas</h4>
                  <ul class="dress-code-list elegant-body"
                    :style="{ color: textColor, fontSize: '1rem', textAlign: 'left', listStyle: 'none', padding: 0 }">
                    <li v-if="invitation.dress_code.toLowerCase() === 'formal'" class="mb-2">
                      <i class="fas fa-check-circle me-2" :style="{ color: primaryColor, fontSize: '0.85rem' }"></i>
                      Vestido largo o de cóctel
                    </li>
                    <li v-if="invitation.dress_code.toLowerCase() === 'formal'" class="mb-2">
                      <i class="fas fa-check-circle me-2" :style="{ color: primaryColor, fontSize: '0.85rem' }"></i>
                      Elegante y sofisticado
                    </li>
                    <li v-if="invitation.dress_code.toLowerCase() === 'formal'" class="mb-2">
                      <i class="fas fa-check-circle me-2" :style="{ color: primaryColor, fontSize: '0.85rem' }"></i>
                      Zapatos de tacón o flats elegantes
                    </li>
                    <li v-if="invitation.dress_code.toLowerCase() === 'formal'" class="mb-2">
                      <i class="fas fa-check-circle me-2" :style="{ color: primaryColor, fontSize: '0.85rem' }"></i>
                      Accesorios discretos
                    </li>
                    <li
                      v-if="invitation.dress_code.toLowerCase() === 'semi-formal' || invitation.dress_code.toLowerCase() === 'semi formal'"
                      class="mb-2">
                      <i class="fas fa-check-circle me-2" :style="{ color: primaryColor, fontSize: '0.85rem' }"></i>
                      Vestido de cóctel o elegante
                    </li>
                    <li
                      v-if="invitation.dress_code.toLowerCase() === 'semi-formal' || invitation.dress_code.toLowerCase() === 'semi formal'"
                      class="mb-2">
                      <i class="fas fa-check-circle me-2" :style="{ color: primaryColor, fontSize: '0.85rem' }"></i>
                      Conjunto elegante
                    </li>
                    <li v-if="invitation.dress_code.toLowerCase() === 'casual'" class="mb-2">
                      <i class="fas fa-check-circle me-2" :style="{ color: primaryColor, fontSize: '0.85rem' }"></i>
                      Vestido casual elegante
                    </li>
                    <li v-if="invitation.dress_code.toLowerCase() === 'casual'" class="mb-2">
                      <i class="fas fa-check-circle me-2" :style="{ color: primaryColor, fontSize: '0.85rem' }"></i>
                      Conjunto cómodo y elegante
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Gift Suggestions Section -->
    <div v-if="invitation.gifts" class="container-fluid position-relative py-5 section-bg">
      <div class="position-absolute leaf-decoration" style="top: 50px; left: 8%; transform: rotate(-45deg);"><i
          class="fas fa-leaf"></i></div>
      <div class="position-absolute leaf-decoration" style="bottom: 40px; right: 10%; transform: rotate(70deg);"><i
          class="fas fa-leaf"></i></div>
      <div class="container position-relative py-5">
        <div class="mx-auto text-center wow fadeInUp" data-wow-delay="0.1s" style="max-width: 700px;">
          <div class="d-flex align-items-center justify-content-center mb-3">
            <i class="fas fa-gift fa-2x me-3" :style="{ color: primaryColor }"></i>
            <h2 class="display-5 mb-0 elegant-name" :style="{ color: primaryColor, fontSize: '2rem' }">Sugerencia de
              regalos
            </h2>
          </div>
          <p class="lead mb-4 elegant-body" :style="{ color: textColor, fontSize: '1.2rem' }">
            Su presencia en nuestra boda será el mejor regalo. Pero si desean darnos otro obsequio, les dejamos estas
            opciones:
          </p>
          <div class="row g-4">
            <!-- Transfer Option -->
            <div v-if="invitation.gifts.transfer" class="col-md-6">
              <div class="p-4 rounded h-100"
                :style="{ borderStyle: 'double', border: `10px solid ${primaryColor}40`, backgroundColor: 'white', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }">
                <h4 class="mb-3 elegant-heading" :style="{ color: textColor, fontSize: '1.3rem' }">Transferencia</h4>
                <div v-if="invitation.gifts.transfer.qr_code" class="mb-3">
                  <img :src="invitation.gifts.transfer.qr_code" alt="QR Code" class="img-fluid"
                    style="max-width: 200px;">
                </div>
                <div v-if="invitation.gifts.transfer.info" class="small" :style="{ color: textColor }">
                  <p v-for="(line, idx) in invitation.gifts.transfer.info.split('\n')" :key="idx" class="mb-1">{{ line
                  }}
                  </p>
                </div>
              </div>
            </div>
            <!-- Gift Registry -->
            <div v-if="invitation.gifts.registry" class="col-md-6">
              <div class="p-4 rounded h-100"
                :style="{ borderStyle: 'double', border: `10px solid ${primaryColor}40`, backgroundColor: 'white', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }">
                <h4 class="mb-3 elegant-heading" :style="{ color: textColor, fontSize: '1.3rem' }">Nuestra lista</h4>
                <a v-if="invitation.gifts.registry.url" :href="invitation.gifts.registry.url" target="_blank"
                  class="btn btn-md text-white fw-bold text-center" :style="{
                    backgroundColor: primaryColor,
                    borderColor: primaryColor
                  }" style="border-radius: 50px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                  <i class="fas fa-gift me-3"></i>
                  Ver lista de regalos
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No Children Policy Section -->
    <div v-if="invitation.no_children_policy" class="container-fluid position-relative py-5 section-bg">
      <div class="container position-relative py-4">
        <div class="mx-auto text-center wow fadeInUp" data-wow-delay="0.1s" style="max-width: 600px;">
          <div class="p-4 rounded d-inline-block"
            :style="{ borderStyle: 'double', border: `10px solid ${primaryColor}40`, backgroundColor: 'white', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }">
            <div class="d-flex align-items-center justify-content-center mb-3">
              <i class="fas fa-child fa-2x me-3" :style="{ color: primaryColor }"></i>
              <h3 class="mb-0 elegant-heading" :style="{ color: textColor, fontSize: '1.5rem' }">NO NIÑOS</h3>
              <i class="fas fa-times-circle fa-2x ms-3" :style="{ color: primaryColor }"></i>
            </div>
            <p class="mb-0 elegant-body" :style="{ color: textColor, fontSize: '1.1rem' }">
              {{ invitation.no_children_policy }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirmación Start -->
    <div class="container-fluid position-relative py-5 section-bg" id="confirmation" v-if="invitation.whatsapp_number">
      <div class="position-absolute leaf-decoration" style="top: 30px; left: 15%; transform: rotate(-25deg);"><i
          class="fas fa-leaf"></i></div>
      <div class="position-absolute leaf-decoration" style="bottom: 25px; right: 12%; transform: rotate(55deg);"><i
          class="fas fa-leaf"></i></div>
      <div class="container position-relative py-5">
        <div class="mx-auto text-center mb-5 wow fadeInUp" data-wow-delay="0.1s" style="max-width: 800px;">
          <h1 class="display-1 elegant-heading" :style="{ color: primaryColor, fontSize: '2.8rem' }">¡Confirma tu
            asistencia!</h1>
          <h4 class="mb-4 elegant-body" :style="{ color: textColor, fontSize: '1.4rem' }">Nos encantaría que nos
            acompañes
            en
            nuestro día especial</h4>
          <p class="lead mb-5 elegant-body" :style="{ color: textColor, fontSize: '1.2rem' }">
            Haz clic en el botón de abajo para confirmar tu asistencia a través de WhatsApp
          </p>
          <div class="d-flex justify-content-center gap-3 flex-wrap">
            <a :href="whatsappUrl" target="_blank" class="btn btn-md px-5 py-3 text-white fw-bold" :style="{
              backgroundColor: primaryColor,
              borderColor: primaryColor
            }" style="border-radius: 50px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
              <i class="fab fa-whatsapp me-3"></i>
              Confirmar Asistencia
            </a>
            <a :href="googleCalendarUrl" target="_blank" class="btn btn-md px-5 py-3 fw-bold" :style="{
              borderColor: primaryColor,
              color: primaryColor,
              backgroundColor: 'white'
            }" style="border-radius: 50px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); border: 2px solid;">
              <i class="fab fa-google me-3"></i>
              Agregar a Calendario
            </a>
          </div>
          <div class="mt-4">
            <small class="text-muted">
              <i class="fas fa-info-circle me-1"></i>
              Haz clic en "Confirmar Asistencia" para enviar un mensaje por WhatsApp
            </small>
          </div>
        </div>
      </div>
    </div>
    <!-- Confirmación End -->

    <!-- Thank You Message -->
    <div class="container-fluid position-relative py-5 section-bg">
      <div class="position-absolute leaf-decoration" style="top: 20px; right: 8%; transform: rotate(40deg);"><i
          class="fas fa-leaf"></i></div>
      <div class="position-absolute leaf-decoration" style="bottom: 30px; left: 10%; transform: rotate(-60deg);"><i
          class="fas fa-leaf"></i></div>
      <div class="container position-relative py-5">
        <div class="mx-auto text-center wow fadeInUp" data-wow-delay="0.1s" style="max-width: 800px;">
          <h2 class="display-4 mb-4 elegant-heading" :style="{ color: primaryColor, fontSize: '2rem' }">ESPERAMOS CONTAR
            CON
            SU PRESENCIA</h2>
          <h1 class="display-2 fw-bold elegant-name" :style="{ color: primaryColor, fontSize: '3.5rem' }">Muchas
            Gracias!
          </h1>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.music-player-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 2000;
  animation: fadeInRight 1s ease-out 2s both;
}

.music-player {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 6px 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-width: 280px;
}

.music-controls {
  display: flex;
  align-items: center;
}

.music-info {
  flex: 1;
  min-width: 0;
}

.music-info small {
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  line-height: 1.2;
}

.btn {
  transition: all 0.3s ease;
}

.btn:hover {
  transform: scale(1.05);
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive para móviles */
@media (max-width: 1200px) {
  .music-player-container {
    top: 10px;
    border: 0px;
  }

  .music-player {
    padding: 5px 5px;
  }

  .music-info small {
    font-size: 0.7rem;
  }
}

.music-controls button {
  cursor: pointer;
}

.music-player {
  user-select: none;
}

:root {
  --primary-color: #6B8E5A;
  --secondary-color: #A8C99A;
  --background-color: #F0F5F0;
  --text-color: #2C3E2A;
  --white-bg: #FFFFFF;
  --accent-green: #7FA66B;
}

/* Elegant Typography */
.elegant-name {
  font-family: 'Dancing Script', cursive;
  font-weight: 600;
  letter-spacing: 1px;
}

.elegant-heading {
  font-family: 'Playfair Display', serif;
  font-weight: 500;
}

.elegant-body {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
}

body {
  font-family: 'Cormorant Garamond', serif;
  background-color: var(--background-color);
}

/* Decorative leaf elements */
.leaf-decoration {
  position: absolute;
  opacity: 0.2;
  color: var(--primary-color);
  z-index: 0;
  font-size: 2.5rem;
  pointer-events: none;
}

.leaf-decoration i {
  color: var(--primary-color);
  opacity: 0.25;
}

/* White content blocks with better contrast */
.content-block {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  padding: 2rem;
}

/* Better text contrast */
.text-dark-green {
  color: var(--text-color);
}

/* Section backgrounds */
.section-bg {
  background-color: var(--background-color);
}

/* Enhanced card styles */
.elegant-card {
  background-color: white;
  border: 2px solid rgba(107, 142, 90, 0.2);
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.elegant-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Timeline Styles */
.timeline-container {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 3rem 1rem;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--text-color);
  opacity: 0.3;
  transform: translateX(-50%);
  z-index: 1;
}

.timeline-item {
  position: relative;
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  min-height: 60px;
  z-index: 2;
}

.timeline-item-left {
  flex-direction: row;
}

.timeline-item-right {
  flex-direction: row-reverse;
}

.timeline-dot {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background-color);
}

.timeline-dot i {
  font-size: 1.1rem;
  color: var(--text-color);
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-dot i {
  color: var(--primary-color);
  transform: scale(1.2);
}

.timeline-content {
  flex: 1;
  max-width: calc(50% - 40px);
}

.timeline-item-left .timeline-content {
  text-align: right;
  padding-right: 1.5rem;
}

.timeline-item-right .timeline-content {
  text-align: left;
  padding-left: 1.5rem;
}

.timeline-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.timeline-item-left .timeline-text {
  align-items: flex-end;
}

.timeline-item-right .timeline-text {
  align-items: flex-start;
}

.timeline-time {
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.3px;
  font-family: 'Public Sans', sans-serif;
  color: var(--text-color);
  opacity: 0.9;
}

.timeline-title {
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: 0.2px;
  color: var(--text-color);
  margin: 0;
}

/* Mobile - Mantiene la misma estructura alternada con línea centrada */
@media (max-width: 768px) {
  .timeline-container {
    padding: 2rem 0.75rem;
  }

  .timeline-line {
    left: 50%;
    width: 1.5px;
  }

  .timeline-dot {
    left: 50%;
    width: 32px;
    height: 32px;
  }

  .timeline-dot i {
    font-size: 0.95rem;
  }

  .timeline-item {
    margin-bottom: 2rem;
    min-height: 50px;
  }

  .timeline-content {
    max-width: calc(50% - 25px);
  }

  .timeline-item-left .timeline-content {
    padding-right: 0.75rem;
    text-align: right;
  }

  .timeline-item-right .timeline-content {
    padding-left: 0.75rem;
    text-align: left;
  }

  .timeline-time {
    font-size: 0.8rem;
  }

  .timeline-title {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .timeline-container {
    padding: 1.5rem 0.5rem;
  }

  .timeline-line {
    left: 50%;
    width: 1px;
  }

  .timeline-dot {
    left: 50%;
    width: 28px;
    height: 28px;
  }

  .timeline-dot i {
    font-size: 0.85rem;
  }

  .timeline-content {
    max-width: calc(50% - 20px);
  }

  .timeline-item-left .timeline-content {
    padding-right: 0.5rem;
  }

  .timeline-item-right .timeline-content {
    padding-left: 0.5rem;
  }

  .timeline-time {
    font-size: 0.75rem;
  }

  .timeline-title {
    font-size: 0.85rem;
  }
}

.text-primary {
  color: var(--primary-color) !important;
}

.bg-primary {
  background-color: var(--primary-color) !important;
}

.text-secondary {
  color: var(--secondary-color) !important;
}

.bg-secondary {
  background-color: var(--secondary-color) !important;
}

/* Estilos para elementos con colores personalizados */
.custom-primary {
  color: var(--primary-color);
}

.custom-secondary {
  color: var(--secondary-color);
}

.custom-background {
  background-color: var(--background-color);
}

.custom-text {
  color: var(--text-color);
}

/* Animación para el estado de carga */
@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.music-info small:first-of-type {
  animation: pulse 2s infinite;
}

.text-warning {
  color: #ffc107 !important;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3) !important;
  transition: all 0.3s ease;
}

@keyframes whatsappPulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}

.btn[href*="wa.me"] {
  animation: whatsappPulse 2s infinite;
}

.btn[href*="wa.me"]:hover {
  animation: none;
}

/* Dress Code Styles */
.dress-code-box {
  border-radius: 8px;
  text-align: center;
}

.dress-code-type {
  text-transform: capitalize;
}

.dress-code-gender {
  text-align: center;
}

.dress-code-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.dress-code-list {
  margin: 0;
}

.dress-code-list li {
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.dress-code-list li i {
  margin-top: 0.25rem;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .dress-code-box {
    padding: 2rem 1.5rem !important;
  }

  .dress-code-type {
    font-size: 1.5rem !important;
  }

  .dress-code-gender-title {
    font-size: 1.1rem !important;
  }

  .dress-code-list {
    font-size: 0.9rem !important;
  }
}

/* Countdown Timer Styles - Minimalist Design */
.countdown-section {
  position: relative;
  min-height: 400px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.countdown-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('/assets/layouts/classic/img/wedding-date-bg.jpg') center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
}

.countdown-background::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.countdown-section .container {
  z-index: 2;
}

.countdown-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
  text-align: center;
}

.countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.countdown-number {
  font-size: 5rem;
  font-weight: 700;
  font-family: 'Public Sans', sans-serif;
  line-height: 1;
  margin-bottom: 0.75rem;
  letter-spacing: -2px;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.countdown-label {
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-family: 'Public Sans', sans-serif;
  color: white;
  opacity: 0.95;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
}

@media (max-width: 992px) {
  .countdown-container {
    gap: 2.5rem;
  }

  .countdown-number {
    font-size: 4rem;
  }

  .countdown-label {
    font-size: 0.8rem;
  }
}

@media (max-width: 768px) {
  .countdown-section {
    min-height: 350px;
  }

  .countdown-container {
    gap: 2rem;
  }

  .countdown-number {
    font-size: 3.5rem;
    letter-spacing: -1.5px;
  }

  .countdown-label {
    font-size: 0.75rem;
    letter-spacing: 1.5px;
  }
}

@media (max-width: 480px) {
  .countdown-section {
    min-height: 300px;
    padding: 3rem 0 !important;
  }

  .countdown-container {
    gap: 1.5rem;
  }

  .countdown-number {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .countdown-label {
    font-size: 0.65rem;
    letter-spacing: 1px;
  }
}
</style>

<script setup lang="ts">

import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const route = useRoute()
const { getInvitationByUrl, formatDate, loadInvitations, invitations } = useInvitations()

definePageMeta({
  layout: 'classic'
})

const invitation = ref<any>(null)
const loading = ref(true)

const audioPlayer = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const isMuted = ref(false)
const audioLoaded = ref(false)
const autoplayBlocked = ref(false)

const storyEvents = computed(() => {
  if (!invitation.value?.story) return []
  try {
    return typeof invitation.value.story === 'string'
      ? JSON.parse(invitation.value.story)
      : invitation.value.story
  } catch (error) {
    console.error('Error parsing story:', error)
    return []
  }
})

const weddingTimeline = computed(() => {
  if (!invitation.value?.wedding_timeline) return []
  try {
    return typeof invitation.value.wedding_timeline === 'string'
      ? JSON.parse(invitation.value.wedding_timeline)
      : invitation.value.wedding_timeline
  } catch (error) {
    console.error('Error parsing wedding timeline:', error)
    return []
  }
})

const galleryPhotos = computed(() => {
  if (!invitation.value?.gallery_photos) return []
  return invitation.value.gallery_photos
})

const whatsappUrl = computed(() => {
  if (!invitation.value?.whatsapp_number) return ''

  const cleanNumber = invitation.value.whatsapp_number.replace(/[\s\-\(\)]/g, '')

  const numberWithCountry = cleanNumber.startsWith('+') ? cleanNumber : `+${cleanNumber}`

  const message = encodeURIComponent(
    `¡Hola! Confirmo mi asistencia. Encantado de asistir a su boda. ¡Gracias por invitarme!`
  )

  return `https://wa.me/${numberWithCountry}?text=${message}`
})

const googleCalendarUrl = computed(() => {
  if (!invitation.value?.event_date) return ''

  try {
    const eventDate = new Date(invitation.value.event_date)

    const eventDateLocal = new Date(eventDate)
    
    const startDateObj = new Date(eventDateLocal)
    startDateObj.setHours(20, 0, 0, 0) // 8:00 PM hora local
    
    const endDateObj = new Date(eventDateLocal)
    endDateObj.setDate(endDateObj.getDate() + 1) // Día siguiente
    endDateObj.setHours(2, 0, 0, 0) // 2:00 AM hora local

    const formatDate = (date: Date): string => {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')
      return `${year}${month}${day}T${hours}${minutes}${seconds}`
    }

    const startDate = formatDate(startDateObj)
    const endDate = formatDate(endDateObj)

    const title = encodeURIComponent(
      `Boda de ${invitation.value.bride_name || ''} & ${invitation.value.groom_name || ''}`
    )

    let description = ''
    if (invitation.value.invitation_message) {
      description += invitation.value.invitation_message
    }
    if (invitation.value.bible_verse) {
      description += `\n\n"${invitation.value.bible_verse}"`
      if (invitation.value.bible_reference) {
        description += ` - ${invitation.value.bible_reference}`
      }
    }
    if (invitation.value.venue) {
      description += `\n\nLugar: ${invitation.value.venue}`
    }
    if (invitation.value.religious_ceremony?.location) {
      description += `\n\nCeremonia: ${invitation.value.religious_ceremony.location}`
      if (invitation.value.religious_ceremony.address) {
        description += `, ${invitation.value.religious_ceremony.address}`
      }
    }
    if (invitation.value.reception?.location) {
      description += `\n\nRecepción: ${invitation.value.reception.location}`
      if (invitation.value.reception.address) {
        description += `, ${invitation.value.reception.address}`
      }
    }

    const encodedDescription = encodeURIComponent(description)

    const location = encodeURIComponent(
      invitation.value.venue ||
      invitation.value.reception?.location ||
      invitation.value.religious_ceremony?.location ||
      ''
    )

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${encodedDescription}&location=${location}`
  } catch (error) {
    console.error('Error generating Google Calendar URL:', error)
    return ''
  }
})

// helper colors - Updated to match elegant green theme
const primaryColor = computed(() => invitation.value?.primary_color || '#6B8E5A')
const secondaryColor = computed(() => invitation.value?.secondary_color || '#A8C99A')
const backgroundColor = computed(() => invitation.value?.background_color || '#F0F5F0')
const textColor = computed(() => invitation.value?.text_color || '#2C3E2A')

const countdown = ref({
  days: '00',
  hours: '00',
  minutes: '00',
  seconds: '00'
})

const formatStoryDate = (dateString: string): string => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).toUpperCase()
}

function updateCountdown() {
  if (!invitation.value?.event_date) return
  const eventDate = new Date(invitation.value.event_date)
  const now = new Date()
  const diff = eventDate.getTime() - now.getTime()

  if (diff <= 0) {
    countdown.value = { days: '00', hours: '00', minutes: '00', seconds: '00' }
    return
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  countdown.value = {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0')
  }
}

let interval: any

onMounted(() => {
  updateCountdown()
  interval = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
  // Pausar música cuando se desmonta el componente
  if (audioPlayer.value) {
    audioPlayer.value.pause()
  }
})

// functions for music player
const toggleMusic = () => {
  if (!audioPlayer.value || !audioLoaded.value) return

  if (isPlaying.value) {
    audioPlayer.value.pause()
  } else {
    audioPlayer.value.play().catch(error => {
      console.log('Reproducción manual iniciada por el usuario')
    })
  }
}

const toggleMute = () => {
  if (!audioPlayer.value) return

  isMuted.value = !isMuted.value
  audioPlayer.value.muted = isMuted.value
}

const skipBackward = () => {
  if (!audioPlayer.value) return
  audioPlayer.value.currentTime = Math.max(0, audioPlayer.value.currentTime - 10)
}

const skipForward = () => {
  if (!audioPlayer.value) return
  audioPlayer.value.currentTime = Math.min(audioPlayer.value.duration, audioPlayer.value.currentTime + 10)
}

const onAudioLoaded = () => {
  audioLoaded.value = true
  if (audioPlayer.value) {
    audioPlayer.value.volume = 0.5

    setTimeout(() => {
      if (audioPlayer.value && audioLoaded.value) {
        audioPlayer.value.play().then(() => {
          console.log('Autoplay exitoso')
          autoplayBlocked.value = false
        }).catch(error => {
          console.log('Autoplay bloqueado por el navegador - el usuario puede reproducir manualmente')
          autoplayBlocked.value = true
        })
      }
    }, 2000)
  }
}

const onAudioError = (event: Event) => {
  const audioElement = event.target as HTMLAudioElement
  console.error('Error de reproducción de audio:', audioElement.error)
  audioLoaded.value = false
  isPlaying.value = false
}

onMounted(async () => {
  await loadInvitation()
})

const loadInvitation = async () => {
  try {
    // Intentar obtener la URL desde query params, params de ruta, o hash
    const urlParam = route.query.url as string || route.params.url as string || route.hash.replace('#', '')

    let data = null
    if (urlParam) {
      data = await getInvitationByUrl(urlParam)
    } else {
      // Si no hay parámetro, cargar la primera invitación activa
      await loadInvitations()
      data = invitations.value.find(inv => inv.is_active) || invitations.value[0] || null
    }

    invitation.value = data
  } catch (error) {
    console.error('Error loading invitation:', error)
    invitation.value = null
  } finally {
    loading.value = false
  }
}

// Estilos dinámicos para la invitación
const invitationStyles = computed(() => {
  if (!invitation.value) return {}

  const bgColor = invitation.value.background_color || '#F0F5F0'

  return {
    '--primary-color': invitation.value.primary_color || '#6B8E5A',
    '--secondary-color': invitation.value.secondary_color || '#A8C99A',
    '--background-color': bgColor,
    '--text-color': invitation.value.text_color || '#2C3E2A',
    'backgroundColor': bgColor,
    'minHeight': '100vh'
  }
})
</script>