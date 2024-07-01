import React from 'react';
import styles from '../styles/page.module.css';
import Image from 'next/image';

const Card = ({ item }) => {
  return (
    <div className={styles.card}>
      <h2>{item.NOME}</h2>
      <div className={styles.cardContent}>
        <p><span>Idade:</span> {item["Idade"]}</p>
        <p>
          <span>Contato:</span> {item["TELEFONE"]}{' '}
          <a href={item['whatsapp']} target="_blank" rel="noopener noreferrer">
            <Image src="/whatsapp.png" alt="WhatsApp" width={24} height={24} />
          </a>
        </p>
        <p><span>Nível de Tênis:</span> {item["NÍVEL DE TÊNIS"]}</p>
        <p><span>Interesse:</span> {item["INTERESSE"]}</p>
        <p><span>Requisitos sobre o nível do adversário/parceiro:</span> {item["NÍVEL DO ADVERSÁRIO/PARCEIRO DE TREINO"]}</p>
        <p><span>Requisitos sobre o gênero do adversário/parceiro:</span> {item["GÊNERO DO ADVERSÁRIO/PARCEIRO DE JOGO/TREINO DESEJADO"]}</p>
        <p><span>Objetivo:</span> {item["OBJETIVO"]}</p>
        <p><span>Preferência de dia:</span> {item["PREFERÊNCIA DE DIA"]}</p>
        <p><span>Preferência de horário:</span> {item["PREFERÊNCIA DE HORÁRIO"]}</p>
      </div>
    </div>
  );
};

export default Card;
