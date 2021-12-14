import React from 'react'
import QrScanner from 'qr-scanner'
import './App.css'

export default class App extends React.Component {

    state = {
        message: '',
        file: null
    }

    componentDidMount() {
        fetch('/api').then(res => res.json()).then(res => this.setState({ message: res.message }))
    }

    uploadFile = (file) => {
        const formData = new FormData()
        formData.append('file', file, file.name)
        fetch('/upload', { method: 'post', body: formData }).then(res => res.json()).then(res => this.setState({ message: res.message }))
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        if (!this.state.file) return

        QrScanner.scanImage(this.state.file)
            .then(result => console.log(result))
            .catch(e => console.log(e, 'No QR code found.'))

        // this.uploadFile(this.state.file)
    }

    handleOnChange = (e) => {
        console.log(e.target.value)
        this.setState({ file: e.target.files[0] })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>{this.state.message}</h1>
                    <input type='file' onChange={this.handleOnChange} />
                    <button type='submit'>Upload File</button>
                </form>
            </div>
        )
    }
}
