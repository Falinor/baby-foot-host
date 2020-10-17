<template>
  <div>
    <web-cam
      autoplay
      :width="width"
      :height="height"
      :device-id="deviceId"
    ></web-cam>
  </div>
</template>

<script>
import { WebCam } from 'vue-web-cam'

import { randomElement } from '@/core'

const CHANGE_CAMERA_TIMEOUT = 5000

export default {
  name: 'WebcamPlayer',
  components: {
    WebCam,
  },
  data: () => ({
    deviceId: null,
    width: window.innerWidth,
    height: window.innerHeight,
  }),
  async mounted() {
    const devices = await this.enumerateVideoDevices()
    if (devices?.length) {
      this.deviceId = devices[0].deviceId
      this.changeCameraSometimes()
    }
  },
  methods: {
    async enumerateVideoDevices() {
      const devices = await navigator.mediaDevices.enumerateDevices()
      return (
        devices
          .filter((device) => device.kind === 'videoinput')
          // Omit the Mac's built-in camera
          .filter((device) => device.label.startsWith('HD Web Camera'))
      )
    },
    changeCameraSometimes() {
      setInterval(async () => {
        const devices = await this.enumerateVideoDevices()
        const randomCamera = randomElement(
          // Omit the currently selected camera
          devices.filter((device) => device.deviceId !== this.deviceId)
        )
        this.deviceId = randomCamera.deviceId
      }, CHANGE_CAMERA_TIMEOUT)
    },
  },
}
</script>
