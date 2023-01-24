import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import Input from "../components/lib/form-and-error-components/Input";
import {updatePassword} from '../api/backend/users';
import { useNavigate } from "react-router-dom";
import { URL_PROFILE } from "../constants/urls/urlFrontEnd";

const UpdatePasswordView = ()=>{

    const defaulValuesUpdate = {
        password : '',
        newpassword : '',
    }
    
    const schemaFormUpdate = Yup.object().shape({
        password: Yup.string().min(8, 'minimum 8 caractères').required('Mot de passe obligatoire'),
        newpassword: Yup.string().min(8, 'minimum 8 caractères').required('Mot de passe obligatoire'),
    });

    const navigate = useNavigate()

    const handleSubmit = async () => {
       await updatePassword()
        navigate(URL_PROFILE)
    }

return (
    <Formik
    initialValues={defaulValuesUpdate}
    onSubmit={handleSubmit}
    validationSchema={schemaFormUpdate}>
        <Form className="mt-8 space-y-6 rounded-md flex justify-center pb-8 ">
        <div className="flex justify-center flex-col w-96">
            <Field
                type="password"
                name="password"
                autoComplete="password"
                placeholder="Nouveau mot de passe"
                component={Input}
                className="rounded-none mt-1"
                noError
            />
            <ErrorMessage
                name="password"
                component="small"
                className="text-red-500"
            />
            <Field
                type="password"
                placeholder="Répéter nouveau mot de passe"
                name="newpassword"
                autoComplete="newpassword"
                component={Input}
                className="rounded-none mt-1"
                noError
            />
            <ErrorMessage
                name="newpassword"
                component="small"
                className="text-red-500"
            />
            <button
                type="submit"
                className="btn flex justify-center rounded-sm hover:bg-dark-pink text-white bg-light-pink w-40 mt-4 hover:scale-105 active:scale-100 active:duration-100 duration-500">
                Enregistrer
            </button>
            </div>
        </Form>

    </Formik>
)
}

export default UpdatePasswordView