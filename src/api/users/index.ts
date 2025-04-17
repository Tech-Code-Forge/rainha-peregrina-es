import { api } from '@/lib/axios'
import { UpdateUserType } from '@/types/updateUserType'
import { UserInfoType } from '@/types/userInfoType'

async function deleteUser() {
  const response = await api.delete<UserInfoType>(`/users`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return response
}

async function getUsersInfo() {
  const response = await api.get<UserInfoType>('/users/info', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return response.data
}

async function putUserData(userData: UpdateUserType) {
  const response = await api.put<UpdateUserType>(`/users`, userData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return response
}

export { deleteUser, getUsersInfo, putUserData }
