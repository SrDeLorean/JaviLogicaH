import store from '@/store'
import { axios } from 'axios'

store.subscribe((mutation) => {
    switch (mutation.type) {
        case 'auth/SET_TOKEN':
            if (mutation.payload){
                localStorage.setItem('token', mutation.payload)
            }else{
                localStorage.removeItem('token')
            }
            break;
        }
    
})