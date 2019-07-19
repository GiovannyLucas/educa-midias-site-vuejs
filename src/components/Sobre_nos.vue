<template>
  <div xs12>
    <v-tabs
      v-model="active"
      color="white"
      slider-color="purple"
    >
    <!--TAB Colaboradores-->
      <v-tab
        ripple
      >
        Colaboradores
      </v-tab>
      <v-tab-item>
      <v-card flat>
        <v-container class="sub-content">
          <Colaboradores />
        </v-container>
      </v-card>
      </v-tab-item>
    <!--TAB Localização-->
      <v-tab
        ripple
      >
        Localização
      </v-tab>
      <v-tab-item>
      <v-card flat>
        <v-container class="sub-content">
          <Localizacao />
        </v-container>
      </v-card>
      </v-tab-item>

    <!--TAB Quem somos-->
      <v-tab
        ripple
      >
        Quem somos
      </v-tab>
      <v-tab-item>
      <v-card flat>
        <v-container class="sub-content">
          <QuemSomos />
        </v-container>
      </v-card>
      </v-tab-item>

      <!--TAB TimeLine-->
      <v-tab
        ripple
      >
        TimeLine
      </v-tab>
      <v-tab-item>
      <v-card flat>
        <v-container class="sub-content">
          <Timeline />
        </v-container>
      </v-card>
      </v-tab-item>
    </v-tabs>

    <div class="text-xs-center mt-3">
      <v-btn @click="next">Próxima aba</v-btn>
    </div>
  </div>
</template>

<script>
import Colaboradores from './sub_sobre/colaboradores'
import Localizacao from './sub_sobre/localizacao'
import QuemSomos from './sub_sobre/quem_somos'
import Timeline from './sub_sobre/timeline'

export default {
  components: {
    Colaboradores,
    Localizacao,
    QuemSomos,
    Timeline
  },
  data () {
    return {
      active: null,
      submenus: [
        {title: 'Colaboradores', tag_importacao: '<Colaboradores />'},
        {title: 'Localização', tag_importacao: '<Localizacao />'},
        {title: 'Quem somos', tag_importacao: '<QuemSomos />'},
        {title: 'Timeline', tag_importacao: '<Timeline />'}
      ]
    }
  },
  methods: {
    next () {
      const active = parseInt(this.active)
      this.active = (active < 2 ? active + 1 : 0)
    }
  }
}
</script>
<style scoped>
.tabs {
  background: linear-gradient(to right, #00008B, #C71585);
}
</style>
