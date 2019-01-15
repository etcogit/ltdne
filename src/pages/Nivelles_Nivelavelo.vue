<template>
  <q-page padding>
    <!-- content -->
    <p class="caption">Envoie-nous tes vidéos !</p>
    <q-field
      helper="Obligatoire"
      :error="$v.form.inputEmailUploader.$error"
      error-label="Cette adresse email pose problème"
    >
      <q-input type="email" float-label="Email de la personne qui envoie la vidéo" placeholder="ex: moi@exemple.com" v-model="form.inputEmailUploader" @blur="$v.form.inputEmailUploader.$touch" />
    </q-field>
    <q-field
      helper=""
      :error="$v.form.inputPrenom.$error"
      error-label="Ce champ ne peut être vide"
    >
      <q-input type="text" float-label="Prénom" v-model="form.inputPrenom" @blur="$v.form.inputPrenom.$touch" />
    </q-field>
    <q-field
      helper=""
      :error="$v.form.inputNom.$error"
      error-label="Ce champ ne peut être vide"
    >
      <q-input type="text" float-label="Nom" v-model="form.inputNom" @blur="$v.form.inputNom.$touch" />
    </q-field>
    <q-field
      helper=""
      :error="$v.form.inputEmailOwner.$error"
      error-label="Cette adresse email pose problème"
    >
      <q-input type="email" float-label="Email du propriétaire de la vidéo" placeholder="ex: moi@exemple.com" v-model="form.inputEmailOwner" @blur="$v.form.inputEmailOwner.$touch" />
    </q-field>
    <q-field
      helper=""
    >
      <q-input type="tel" float-label="Téléphone" placeholder="ex: 0444/12.34.56" v-model="form.inputTel" />
    </q-field>
    <q-field
      helper=""
      :error="$v.form.inputAgreedTerms.$error"
      error-label="Vous devez certifier avoir accepté les conditions"
    >
      <q-checkbox v-model="form.inputAgreedTerms" label="J'ai fait le nécessaire" @blur="$v.form.inputAgreedTerms.$touch" keep-color :color="$v.form.inputAgreedTerms.$error ? 'negative' : 'positive'" />
    </q-field>
    <q-field
      helper=""
    >
      <q-uploader
        multiple
        :url = "url"
        method = "POST"
        :additional-fields = additionnalFields
        auto-expand
        :extensions = allowedExtensions
        :filter="filterFiles"
        hide-upload-button
        ref="uploader"
      />
    </q-field>
    <q-btn color="primary" @click="submit">Envoyer</q-btn>
  </q-page>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  // name: 'PageName',
  data () {
    return {
      url: 'http://vps623365.ovh.net:3030/upload-files',
      form: {
        inputEmailUploader: '',
        inputPrenom: '',
        inputNom: '',
        inputEmailOwner: '',
        inputTel: '',
        inputAgreedTerms: false,
        inputFiles: ''
      },
      allowedExtensions: '.jpg, .jpeg, .png, .mov, .mp4, .avi, .wmv'
    }
  },
  computed: {
    additionnalFields: function () {
      return [
        {name: 'emailUploader', value: this.form.inputEmailUploader},
        {name: 'prenom', value: this.form.inputPrenom},
        {name: 'nom', value: this.form.inputNom},
        {name: 'emailOwner', value: this.form.inputEmailOwner},
        {name: 'tel', value: this.form.inputTel},
        {name: 'agreedTerms', value: this.form.inputAgreedTerms}
      ]
    }
  },
  validations: {
    form: {
      inputEmailUploader: { required, email },
      inputPrenom: { required },
      inputNom: { required },
      inputEmailOwner: { email },
      inputAgreedTerms: {
        required (val) {
          return val
        }
      }
    }
  },
  methods: {
    submit () {
      this.$v.form.$touch()

      if (this.$v.form.$error) {
        this.$q.notify('Le formulaire ne peut pas être envoyé parce qu\'il contient des erreurs.')
        return
      }
      this.$refs.uploader.upload() // J'appelle la méthode 'upload' du composant this.$refs.uploader -> j'ai dû rajouter 'ref="uploader"' comme attribut à mon composant html pour qu'il soit renseigné dans this.$ref
    },
    filterFiles (files) { // Filtre personnalisé pour limiter la sélection de fichiers en-deçà d'un certain poids
      const MAX_FILE_SIZE = 100 * 1024 * 1024 /* =100M */
      // returns an Array containing allowed files
      return files.filter((file) => {
        return file.size <= MAX_FILE_SIZE
      })
    }

  }
}
</script>

<style>
</style>
