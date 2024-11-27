import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard() {
    return (
        <Card sx={{
            maxWidth: 345,
            display: 'flex', // Kích hoạt flexbox
            flexDirection: 'column', // Sắp xếp các con theo chiều dọc
            alignItems: 'center', // Căn giữa theo chiều ngang
            justifyContent: 'center', // Căn giữa theo chiều dọc
            textAlign: 'center', // Căn giữa nội dung text (nếu có)
        }}>
            <CardMedia
                sx={{ height: 48, width: 48 }}
                image="/salary.png"
                title=""
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Salary
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    +$2,000
                </Typography>
            </CardContent>
        </Card>
    );
}
