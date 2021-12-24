const app = {
  url: '',
  slug: '',
  limits: -1,
  expires: 7,
  date: formatDate(Date.now() + 24 * 60 * 60 * 1000 * 7, 'yyyy-MM-dd hh:mm:ss'),
  alert: null,
  loading: false,
  result: false,
  isValidated () {
    return !/^https?:\/\/.{3,}/.test(this.url)
  },
  parseDate () {
    this.date = formatDate(
      Date.now() + 24 * 60 * 60 * 1000 * this.expires,
      'yyyy-MM-dd hh:mm:ss'
    )
  },
  copy () {
    const type = 'text/plain'
    const blob = new Blob([this.url], { type })
    const data = [new ClipboardItem({ [type]: blob })]

    navigator.clipboard.write(data).then(
      function () {
        alert('URL Copied!')
      },
      function () {
        throw new Error('URL copy failed!')
      }
    )
  },
  submit ($refs, $nextTick) {
    if (!this.url) {
      this.alert = {
        type: 'error',
        message: 'Missing required parameter: url.'
      }
      return
    }

    if (this.isValidated()) {
      this.alert = { type: 'error', message: 'Illegal format: url.' }
      return
    }

    this.alert = null
    this.loading = true

    const body = { url: this.url }
    if (this.slug) body.slug = this.slug
    body.expires = this.expires ? +this.expires : 7
    body.limits = this.limits ? +this.limits : -1

    fetch('/create', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then((res) => res.json())
      .then((res) => {
        this.loading = false
        if (res.message) {
          this.alert = { type: 'error', message: res.message }
          return
        }

        this.url = res.link
        this.result = true
        this.slug = ''

        $nextTick(() => {
          $refs.url.select()
          this.alert = {
            type: 'success',
            message: `Short URL ${
              document.execCommand('Copy') ? 'copy' : 'generate'
            } succeeded!`
          }
        })
      })
      .catch((e) => {
        this.alert = { type: 'error', message: e.message }
        this.loading = false
      })
  }
}
