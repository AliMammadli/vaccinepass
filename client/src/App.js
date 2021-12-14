import React from 'react'
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
        // let reader = new FileReader()
        // reader.readAsDataURL(this.state.file)
        // reader.onloadend = (e) => {
        //     console.log('load ended')
        //     this.uploadFile(this.state.file)
        // }

        this.uploadFile(this.state.file)
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
