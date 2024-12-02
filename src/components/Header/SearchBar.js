import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendSearchResult } from '../../api/services';

function SearchBar() {
  const navigate = useNavigate();
  // State để lưu trữ từ khóa tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value); // Cập nhật searchTerm từ input
  };
  const handleSearch = async () => {
    if (searchTerm.trim()) {
      const res = await sendSearchResult(searchTerm);
      navigate('/searching', { state: { searchResults: res, searchTerm } }); // Truyền dữ liệu qua state
      console.log(res);
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
      onChange={handleInputChange}
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
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />


  );
}

export default SearchBar;
