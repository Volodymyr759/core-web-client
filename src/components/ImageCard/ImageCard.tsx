import { Card, CardContent, Typography } from "@mui/material";
import { ImageCardProps } from "./types";
import './styles.css';

export default function ImageCard({ imageUrl, altAttribute, title, subTitle, content }: ImageCardProps): JSX.Element {
    return (
        <Card elevation={16} className="image-card">
            <img
                className="image-card-image"
                alt={altAttribute}
                src={imageUrl}
            />
            <CardContent>
                <p className="image-card-title">{title}</p>
                <p className="image-card-subtitle">{subTitle}</p>
                <Typography variant="body2" color="text.secondary">
                    {content}
                </Typography>
            </CardContent>
        </Card>
    )
}
