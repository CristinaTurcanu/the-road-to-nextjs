import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type CardFormProps = {
    title: string;  
    description?: string;
    content: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
}
const CardForm = ({title, description, content, footer, className}: CardFormProps) => {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>
                    {title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {content}
            </CardContent>
            {footer && <CardFooter>{footer}</CardFooter>}
        </Card>
    );
}
export { CardForm };