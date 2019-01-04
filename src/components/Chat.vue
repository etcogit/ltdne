<template>
  <q-page class="flex flex-center">
      <div class="row full-width">
        <div class="layout-padding col-8" >
          <q-chat-message v-for="message in messages" :key="message.id"
            :text="[message.text]"
            :avatar="message.user.avatar"
            :stamp="messageDate(message)"
            :sent="isSent(message) ? true : false"
          />
        </div>
        <q-list highlight class="col-auto">
          <q-list-header>People</q-list-header>
          <q-item v-for="user in users" :key="user.id">
            <q-item-side :avatar="user.avatar" />
            <q-item-main>
              <q-item-tile label>{{user.email}}</q-item-tile>
            </q-item-main>
            <q-item-side right>
              <q-item-tile icon="chat_bubble" color="green" />
            </q-item-side>
          </q-item>
        </q-list>
      </div>
    <q-input
        class="row col-12 fixed-bottom chat-message"
        style="z-index: 1001; margin-top: 16px; margin-bottom: 8px;"
        v-model="message"
        v-on:keyup.enter="send"
        type="textarea"
        float-label="Enter your message"
        :min-rows="1"
      />
  </q-page>
</template>

<script>
export default {
  name: 'Chat',
  data () {
    return {}
  },
  mounted () {
    const messages = api.service('messages')
    const users = api.service('users')

    // Get all users and messages
    messages.find({
      query: {
        $sort: { createdAt: -1 },
        $limit: 25
      }
    })
      .then((response) => {
        // We want the latest messages but in the reversed order
        this.$data.messages = response.data.reverse()
      })
    users.find()
      .then((response) => {
        this.$data.users = response.data
      })

    // Add new messages to the message list
    messages.on('created', message => {
      console.log('message received')
      this.$data.messages.unshift(message)
    })
    // Add new users to the user list
    users.on('created', user => {
      console.log('user received')
      this.$data.users = this.$data.users.concat(user)
    })
  }
}
</script>

<style>
</style>
