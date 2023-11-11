import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
    state: () => {
        return {
          user_id: localStorage.getItem('user_id')
        }
    },
    actions: {
        setUserId(id) {
            this.user_id = id
        }
    }
});