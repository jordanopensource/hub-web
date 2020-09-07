export default function ({ store, redirect }) {
    // If the user is authenticated redirect to his profile
    if (store.getters.auth) {
      return redirect('/me')
    }
  }
