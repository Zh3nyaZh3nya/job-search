// Enums
export enum WorkSchedule {
    FULL_TIME = "FULL_TIME",
    PART_TIME = "PART_TIME",
    SHIFT = "SHIFT",
    FLEXIBLE = "FLEXIBLE",
    REMOTE = "REMOTE",
    PIECEWORK = "PIECEWORK",
    ROTATIONAL = "ROTATIONAL",
    NIGHT_SHIFT = "NIGHT_SHIFT",
    FREE = "FREE",
    PROJECT_BASED = "PROJECT_BASED",
    HOURLY = "HOURLY",
}
export enum EducationLevel {
    NONE = "NONE",
    PRIMARY = "PRIMARY",
    SECONDARY = "SECONDARY",
    VOCATIONAL = "VOCATIONAL",
    HIGHER = "HIGHER",
    BACHELOR = "BACHELOR",
    MASTER = "MASTER",
    DOCTORATE = "DOCTORATE",
    POSTDOCTORAL = "POSTDOCTORAL",
}
export enum EmploymentType {
    FULL_TIME = "FULL_TIME",
    PART_TIME = "PART_TIME",
    FREELANCE = "FREELANCE",
    TEMPORARY = "TEMPORARY",
    INTERNSHIP = "INTERNSHIP",
    VOLUNTEER = "VOLUNTEER",
    REMOTE = "REMOTE",
}
export enum Category {
    IT = "IT",
    SALES = "SALES",
    TRANSPORT = "TRANSPORT",
    DESIGN = "DESIGN",
    EDUCATION = "EDUCATION",
    SERVICE = "SERVICE",
    LAW = "LAW",
    HR = "HR",
}
export enum City {
    ALMATY = "ALMATY",
    ASTANA = "ASTANA",
    SHYMKENT = "SHYMKENT",
    KARAGANDY = "KARAGANDY",
    AKTAU = "AKTAU",
    AKTOBE = "AKTOBE",
    ATYRAU = "ATYRAU",
    KOSTANAY = "KOSTANAY",
    KYZYLORDA = "KYZYLORDA",
    PAVLODAR = "PAVLODAR",
    TARAZ = "TARAZ",
    URALSK = "URALSK",
    UST_KAMENOGORSK = "UST_KAMENOGORSK",
    SEMEY = "SEMEY",
    KOKSHETAU = "KOKSHETAU",
    TURKESTAN = "TURKESTAN",
    TALDYKORGAN = "TALDYKORGAN",
    PETROPAVLOVSK = "PETROPAVLOVSK"
}
export enum Currency {
    KZT = "₸", // Казахстанский тенге
    USD = "$", // Доллар США
    EUR = "€", // Евро
    RUB = "₽", // Российский рубль
}
export enum WorkExperience {
    NO_EXPERIENCE = "NO_EXPERIENCE", // Без опыта
    LESS_THAN_ONE_YEAR = "LESS_THAN_ONE_YEAR", // Менее года
    ONE_TO_THREE_YEARS = "ONE_TO_THREE_YEARS", // 1-3 года
    THREE_TO_FIVE_YEARS = "THREE_TO_FIVE_YEARS", // 3-5 лет
    FIVE_TO_SEVEN_YEARS = "FIVE_TO_SEVEN_YEARS", // 5-7 лет
}
export enum CategoryDriveLicense {
    M = "M",
    A = "A",
    A1 = "A1",
    B = "B",
    B1 = "B1",
    BE = "BE",
    C = "C",
    C1 = "C1",
}

// Interfaces
export interface IUserBase {
    id_user: number
    email: string
    password: string
    notifications: string[]
    userType: 'member' | 'employer'
}

export interface IUserMember extends IUserBase {
    name: string
    last_name: string
    gender: 'man' | 'woman'
    age: number
    resume: IResume[] | null
}

export interface IUserEmployer extends IUserBase {
    company: string
    address: string
    vacancies: IVacancy[] | null
}

export interface IVacancyBase {
    id: number
    slug: string
    title: string
    post: string
    category: string
    from_salary: number
    currency: Currency
    company: string
    date_publish: string
    email: string
    id_user: number
    userType: 'member' | 'employer'
}

export interface IVacancyCardSmall extends Omit<IVacancyBase, 'company' | 'date_publish'> {
    job_format: WorkSchedule
    education: EducationLevel
}

export interface IVacancy extends IVacancyBase {
    to_salary: number | null
    info_vacancy: {
        job_format: WorkSchedule
        education: EducationLevel
        type_employment: EmploymentType
        internship: boolean
        work_experience: WorkExperience
    }
    professional_skills: string[]
    personal_skills: string[]
    city: City
    address: string
}

export interface IVacancyCard extends IVacancyBase {
    to_salary: number | null
    city: City
    address: string
    work_experience: WorkExperience
    job_format: WorkSchedule
    education_level: EducationLevel
}

export interface IResumeBase {
    id: number
    title: string
    slug: string
    from_salary: number | null
    currency: string | null
    work_experience: string
    date_publish: string
    avatar: string
    education_level: EducationLevel
    category: Category
    email: string
    id_user: number
    userType: 'member' | 'employer'
}

export interface IResumeCardSmall extends Omit<IResumeBase, 'date_publish' | "category"> {
}

export interface IResume extends IResumeBase {
    to_salary: number | null
    info_resume: {
        conditions: (EmploymentType | WorkSchedule)[];
        removal: boolean
        business_trip: boolean
        gender: 'MAN' | 'WOMEN'
        age: number
        city: City
        work_experience: {
            date_from: string
            date_to: string
            title: string
            category: Category
            company: string
            desc_experience: string
        }[]
        education: {
            date_from: string
            place: string
            professional: string
        }[]
        professional_skills: string[]
        personal_skills: string
        lang: string[]
        category_drive_license: CategoryDriveLicense[]
    }
}

export interface IResumeCard extends IResumeBase {
    city: City
    to_salary: number | null
}
