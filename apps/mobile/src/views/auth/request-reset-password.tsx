import { Card, Text } from "@rneui/themed";
import { RequestResetPasswordForm } from "../../components/Auth/RequestResetPassword/RequestResetPasswordForm";
import { useRequestResetPassword } from "../../hooks/auth/useRequestResetPassword";

export const RequestResetPassword = () => {
    const { errors, control } = useRequestResetPassword();
    return (
        <Card>
            <Card.Title>
                <Text>Réinitialiser votre mot de passe</Text>
            </Card.Title>
            <Card.Divider />
            <Text>
                Si vous avez oublié votre mot de passe, vous pouvez rentrer
                votre email ci-dessous, un mail vous sera envoyé avec la
                procédure à suivre pour changer votre mot de passe.
            </Text>
            <RequestResetPasswordForm errors={errors} control={control} />
        </Card>
    );
};
