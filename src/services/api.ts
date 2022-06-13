import axios from "axios"

export const LoanApi = () => {
    axios.create({
        baseURL: 'http://localhost:3000'
    })
}