# hms_itk

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
}
```

## Patient Model

### This model is necessary because sensitive information will be recorded in it and later it will be useful for the appointments.

```ts
interface Patient extends User {
  patient_id: number; // references user.id
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
interface Doctor extends User {
  doctor_id: number; // references user.id
  medical_speciality: string; //varchar(100)
  professional_license: string; //varchar(100)
}
```

## Admin Model

### This model is necessary since with it the control of the entire system will be taken and you will be able to access the information of all users

```ts
interface Admin extends User {
  admin_id: number; // references user.id
}
```

## Appointments Model

### This model is necessary since it will show the information of the appointment and in turn helps us to keep a history of these with the information of the doctor and the patient.

```ts
interface Appointments {
  appointment_id: number;
  appointment_date: string; //date
  doctor_info: Doctor; //  user/doctor id
  patient_info: Patient; // user/patient id
}
```
