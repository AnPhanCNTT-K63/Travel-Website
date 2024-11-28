import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const navigate = useNavigate();
  // State để lưu trữ từ khóa tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');
  // Hàm xử lý khi nhấn nút tìm kiếm hoặc nhấn Enter
  const searchMap = {
    '1': '/detail/1',
    '2': '/detail/2',
    '3': '/detail/3',
    '4': '/detail/4',
    '5': '/detail/5',
    '6': '/detail/6',
    '7': '/detail/7',
    '8': '/detail/8',
    '9': '/detail/9',
    'Grand Canyon Adventure': '/detail/1',
  };
  const handleSearch = () => {
    const trimmedSearch = searchTerm.trim();
    if (trimmedSearch) {
      const targetUrl = searchMap[trimmedSearch]; // Tra cứu URL
      if (targetUrl) {
        navigate(targetUrl); // Điều hướng đến URL tương ứng
      } else {
        console.log('Không tìm thấy kết quả:', searchTerm);
      }
    } else {
      console.log('Vui lòng nhập từ khóa tìm kiếm');
    }
  };

  // Hàm xử lý khi nhấn phím Enter
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Search destination or activities"
      size="small"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyPress={handleKeyPress}
      sx={{
        margin: '20px',
        width: 300,
        borderRadius: '50px',
        backgroundColor: '#f5f5f5',
        '& .MuiOutlinedInput-root': {
          borderRadius: '50px', // Bo tròn các góc để tạo hình oval
          paddingRight: '8px', // Thêm khoảng cách để icon không sát quá
          '& fieldset': {
            borderColor: '#d1d1d1', // Màu của border
          },
          '&:hover fieldset': {
            borderColor: 'orange', // Màu border khi hover
          },
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchBar;
