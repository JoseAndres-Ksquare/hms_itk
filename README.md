# hms_itk

## Install dependencies
> ### `npm install ` 
> ### `npm install -D`

## How to run
> ### `npm run dev`

## Define yours enviroment variables
> ![image](https://user-images.githubusercontent.com/102169092/170383713-7db777b5-a09e-4dd8-a8e6-8e3cc8059f66.png)


## Requests Collection
> [https://www.getpostman.com/collections/5a552e39be04d792610d ](https://www.getpostman.com/collections/5a552e39be04d792610d)









## User Model

### This will be my parent model and contains the basic information I need to define each user in a general way.

```ts
interface User {
  id: number; // PrimaryKey & auto_increment
  first_name: string; //varchar(100)
  last_name: string; //varchar(100)
  email: string; //varchar(100)
  password: string; //varchar(20)
  phone_number: string; //varchar(10)
  address: string; //varchar(200)
  role: string; //varchar(100)
  is_deleted: boolean; //soft_deleted
}
```

## Patient Model

### This model is necessary because sensitive information will be recorded in it and later it will be useful for the appointments.

```ts
interface Patient {
  id_user: string; // foreing_key
  id_patient: string; // foreing_key
  id: number; // references user.id
  birth_date: string; //date
  age: number;
  blood_type: string; //varchar(10)
  alergies: string; //varchar(100)
  gender: string; //varchar(20)
}
```

## Doctor Model

### This model will have official information from the doctor and will be useful for the appointment model

```ts
interface Doctor {
  user_id: number; // foreing_key
  id: number; // references user.id
  medical_speciality: string; //varchar(100)
  professional_license: string; //varchar(100)
}
```

## Appointments Model

### This model is necessary since it will show the information of the appointment and in turn helps us to keep a history of these with the information of the doctor and the patient.

```ts
interface Appointments {
  id: number;
  appointment_date: string; //date
  description: string; //varchar()
  doctor_info: Doctor; //  user/doctor id
  patient_info: Patient; // user/patient id
}
```
