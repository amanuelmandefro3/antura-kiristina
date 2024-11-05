import axios from "axios";

interface Volunteer{
    fullName: string
    age: number
    address: string
    phoneNumber: string
    email: string
    residentialAddress: string
    educationLevel: string
    employmentStatus: string
    church: string
    serviceAreas: string
    otherServiceArea?: string
    socialMedia: string
    availabilityFrequency: string
  }

export const registerVolunteer = (volunteer: Volunteer) => {
    // Save volunteer to database
    const response = axios.post(`${process.env.API_BASE_URL}/volunteer/register`, volunteer)
    return response
}