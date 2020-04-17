<template lang="pug">
  .lobby
    StarBackground(:stars="100")
    .lobby--background
      .lobby--center
        Icon.lobby--background-image(cat="sciflat", name="screen")
        .lobby--background-text(v-for="text in connecttext")
          | {{ text }}
    .lobby--container
      .lobby--socket(v-for="socket, index in sockets", :key="socket.uuid", :style="styles(index)")
        Icon.lobby--icon(cat="sciflat", :name="iconname(socket)", bg="1")
        .lobby--uuid
          | {{ iconname(socket) + ': ' + socket.uuid.substring(0, 6) }}
</template>

<script>
import Socket from "~/plugins/socket/screen";
import Calc from "~/plugins/util/Calc";
import Icon from "~/components/medias/Icon.vue";
import StarBackground from "~/components/backgrounds/StarBackground.vue";

export default {
  components: {
    Icon,
    StarBackground
  },
  data() {
    return {
      sockets: [],
      hostdata: null,
      offset: 0
    };
  },
  computed: {
    connecttext() {
      if (this.hostdata === null) return "";
      let admin = null;
      for (const socket of this.sockets) {
        if (socket.type === "admin") {
          admin = socket;
          break;
        }
      }
      const connection =
        this.hostdata.hostname.toLowerCase() + ":" + this.hostdata.port;
      if (admin === null) {
        return ["Waiting for host...", "Connect via " + connection];
      } else {
        return ["Waiting for game start...", "Connect via " + connection];
      }
    }
  },
  methods: {
    iconname(socket) {
      switch (socket.type) {
        case "client":
          return "user";
        case "screen":
          return "screen";
        case "admin":
          return "host";
        case "cli":
          return "cli";
      }
    },
    styles(index) {
      const part = 360 / this.sockets.length;
      const point = Calc.getCirclePoint((part * (index + this.offset)) % 360);

      return {
        top: 50 - point.y * 35 + "%",
        left: 50 - point.x * 35 + "%"
      };
    },
    async update() {
      const response = await Socket.request("getMetas");

      this.sockets = [];
      for (const uuid in response.data) {
        this.sockets.push(response.data[uuid]);
      }
      this.sockets = this.sockets.reverse();
    }
  },
  async mounted() {
    Socket.events.on("socket.connect", () => {
      this.update();
    });
    Socket.events.on("socket.disconnect", () => {
      this.update();
    });
    this.update();
    const response = await Socket.request("getHostdata");
    this.hostdata = response.data;
    setInterval(() => {
      if (this.sockets.length > 2) {
        this.offset = (this.offset + 1) % this.sockets.length;
      }
    }, 8000);
  }
};
</script>

<style lang="sass">
.lobby
  width: 100%
  height: 100%
  position: relative

  &--background
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center

  &--background-image
    position: absolute
    filter: blur(5px)
    width: 40vw
    height: 40vw

  &--background-text
    width: 100%
    text-align: center
    font-size: 65px
    text-shadow: 2px 2px 10px black

  &--center
    position: relative
    display: flex
    justify-content: center
    align-items: center
    flex-wrap: wrap

  &--container
    width: 100%
    height: 100%

  &--socket
    position: absolute
    width: 5vw
    height: 5vw
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    transition: top 1s ease-in-out, left 1s ease-in-out

  &--uuid
    font-size: 8px
    white-space: nowrap
    text-align: center
</style>
