'use client';
import styles from './styles/page.module.css';
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/Card";
import Filter from "./components/Filter";
import { Grid, CircularProgress, Button, TextField, Typography, Box } from '@mui/material';
import Image from 'next/image';

export default function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({});
  const [distinctValues, setDistinctValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    setLoading(true);
    axios.post('https://z3n3ia4bj6.execute-api.us-east-1.amazonaws.com/prod/list', { password }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Access-Control-Allow-Origin': '*',
      }
    })
      .then((resp) => {
        const parsedData = JSON.parse(resp.data.data);
        setData(parsedData);
        setFilteredData(parsedData);
        setDistinctValues(getDistinctValues(parsedData));
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
        setErrorMessage('Falha na autenticação: ' + (error.response?.data?.error || error.message));
        setLoading(false);
      });
  };

  const getDistinctValues = (data) => {
    const distinctValues = {
      "NÍVEL DE TÊNIS": [],
      "INTERESSE": [],
      "NÍVEL DO ADVERSÁRIO/PARCEIRO DE TREINO": [],
      "GÊNERO DO ADVERSÁRIO/PARCEIRO DE JOGO/TREINO DESEJADO": [],
      "OBJETIVO": [],
      "PREFERÊNCIA DE DIA": [],
      "PREFERÊNCIA DE HORÁRIO": [],
    };

    data.forEach(item => {
      Object.keys(distinctValues).forEach(key => {
        if (item[key]) {
          item[key].split(',').forEach(subItem => {
            const trimmedSubItem = subItem.trim();
            if (!distinctValues[key].includes(trimmedSubItem)) {
              distinctValues[key].push(trimmedSubItem);
            }
          });
        }
      });
    });

    return distinctValues;
  };

  const handleFilterChange = (key, values) => {
    setFilters({ ...filters, [key]: values });
  };

  const clearAllFilters = () => {
    setFilters({});
  };

  useEffect(() => {
    let filtered = data;
    Object.keys(filters).forEach(key => {
      if (filters[key] && filters[key].length > 0) {
        filtered = filtered.filter(item => {
          if (!item[key]) return false;
          const itemValues = item[key].split(',').map(subItem => subItem.trim());
          return filters[key].some(filterValue => itemValues.includes(filterValue));
        });
      }
    });
    filtered.sort((a, b) => a.name.localeCompare(b.name));
    setFilteredData(filtered);
  }, [filters, data]);

  if (!isAuthenticated) {
    return (
      <div className={styles.loginWrapper}>
        <header className={styles.header}>
          <Image src="/logo2.png" alt="Logo" className={styles.logo} layout="intrinsic" width={415} height={170} />
        </header>
        <main className={styles.main}>
          <Box className={styles.loginBox}>
            <Typography variant="h4" align="center" className={styles.greenText}>
              Informe a senha compartilhada:
            </Typography>
            <TextField
              type="password"
              label="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.passwordInput}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleLogin} className={styles.loginButton} disabled={loading} fullWidth>
              {loading ? <CircularProgress size={24} /> : 'Enviar'}
            </Button>
            {errorMessage && <Typography color="error" align="center">{errorMessage}</Typography>}
          </Box>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <header className={styles.header}>
          <Image src="/logo2.png" alt="Logo" className={styles.logo} layout="intrinsic" width={415} height={170} />
        </header>
        <h1 className={styles.title}>Encontre seu parceiro de jogo</h1>
        {loading ? (
          <div className={styles.loading}>
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className={styles.filters}>
              {Object.keys(distinctValues).map(key => (
                <Filter
                  key={key}
                  label={key}
                  options={distinctValues[key]}
                  selectedValues={filters[key] || []}
                  onChange={handleFilterChange}
                />
              ))}
              <Button 
                variant="contained" 
                color="primary" 
                onClick={clearAllFilters}
                className={styles.clearButton}
              >
                Limpar Filtros
              </Button>
            </div>
            <div className={styles.resultsCount}>
              Mostrando {filteredData.length} de {data.length} parceiros cadastrados
            </div>
            <Grid direction={"row"} container className={styles.grid} spacing={2} >
              {filteredData.map((item, index) => (
                <Grid item key={index} xs={12} md={4} >
                  <Card item={item} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </main>
    </div>
  );
}
