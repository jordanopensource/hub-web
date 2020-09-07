export default function ({ store, redirect }) {
    // Define homepage if user is authenticated or not
    if (store.getters.auth) {
      return redirect('/me')
    } else {
      return redirect('/join')
    }
  }
