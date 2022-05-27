import FormData from 'form-data';


type Value = [key: string, value: any, options: string | FormData.AppendOptions];

export const formData = (values: Value[]) => {
    const form = new FormData();

    values.forEach((v: Value) => {
        form.append(v[0], v[1], v[2]);
    });

    return form;
};
