// src/utils/formatters.js

/**
 * Formatar CNPJ
 * @param {string} cnpj - CNPJ sem formatação
 * @returns {string} CNPJ formatado (00.000.000/0000-00)
 */
export const formatCNPJ = (cnpj) => {
  if (!cnpj) return '';
  
  const cleaned = cnpj.replace(/\D/g, '');
  
  if (cleaned.length !== 14) return cnpj;
  
  return cleaned.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );
};

/**
 * Formatar CPF
 * @param {string} cpf - CPF sem formatação
 * @returns {string} CPF formatado (000.000.000-00)
 */
export const formatCPF = (cpf) => {
  if (!cpf) return '';
  
  const cleaned = cpf.replace(/\D/g, '');
  
  if (cleaned.length !== 11) return cpf;
  
  return cleaned.replace(
    /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
    '$1.$2.$3-$4'
  );
};

/**
 * Formatar CEP
 * @param {string} cep - CEP sem formatação
 * @returns {string} CEP formatado (00000-000)
 */
export const formatCEP = (cep) => {
  if (!cep) return '';
  
  const cleaned = cep.replace(/\D/g, '');
  
  if (cleaned.length !== 8) return cep;
  
  return cleaned.replace(/^(\d{5})(\d{3})$/, '$1-$2');
};

/**
 * Formatar telefone
 * @param {string} phone - Telefone sem formatação
 * @returns {string} Telefone formatado
 */
export const formatPhone = (phone) => {
  if (!phone) return '';
  
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
  }
  
  if (cleaned.length === 11) {
    return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  }
  
  return phone;
};

/**
 * Formatar data
 * @param {string|Date} date - Data para formatar
 * @param {boolean} includeTime - Se deve incluir hora
 * @returns {string} Data formatada
 */
export const formatDate = (date, includeTime = false) => {
  if (!date) return '';
  
  const d = new Date(date);
  
  if (isNaN(d.getTime())) return '';
  
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  
  const dateStr = `${day}/${month}/${year}`;
  
  if (includeTime) {
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${dateStr} ${hours}:${minutes}`;
  }
  
  return dateStr;
};

/**
 * Formatar moeda (BRL)
 * @param {number} value - Valor numérico
 * @returns {string} Valor formatado em real
 */
export const formatCurrency = (value) => {
  if (value === null || value === undefined) return 'R$ 0,00';
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

/**
 * Formatar número com separador de milhar
 * @param {number} value - Valor numérico
 * @param {number} decimals - Casas decimais
 * @returns {string} Número formatado
 */
export const formatNumber = (value, decimals = 0) => {
  if (value === null || value === undefined) return '0';
  
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
};

/**
 * Formatar porcentagem
 * @param {number} value - Valor numérico (0-100)
 * @param {number} decimals - Casas decimais
 * @returns {string} Porcentagem formatada
 */
export const formatPercentage = (value, decimals = 2) => {
  if (value === null || value === undefined) return '0%';
  
  return `${formatNumber(value, decimals)}%`;
};

/**
 * Formatar peso (kg)
 * @param {number} value - Peso em kg
 * @returns {string} Peso formatado
 */
export const formatWeight = (value) => {
  if (value === null || value === undefined) return '0 kg';
  
  return `${formatNumber(value, 2)} kg`;
};

/**
 * Formatar volume (m³)
 * @param {number} value - Volume em m³
 * @returns {string} Volume formatado
 */
export const formatVolume = (value) => {
  if (value === null || value === undefined) return '0 m³';
  
  return `${formatNumber(value, 3)} m³`;
};

/**
 * Remover formatação de CNPJ/CPF
 * @param {string} value - Valor formatado
 * @returns {string} Apenas números
 */
export const removeFormatting = (value) => {
  if (!value) return '';
  return value.replace(/\D/g, '');
};

/**
 * Truncar texto
 * @param {string} text - Texto para truncar
 * @param {number} maxLength - Tamanho máximo
 * @returns {string} Texto truncado
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Capitalizar primeira letra
 * @param {string} text - Texto
 * @returns {string} Texto capitalizado
 */
export const capitalize = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Formatar nome próprio
 * @param {string} name - Nome
 * @returns {string} Nome formatado
 */
export const formatName = (name) => {
  if (!name) return '';
  
  return name
    .toLowerCase()
    .split(' ')
    .map(word => {
      if (word.length <= 2) return word; // de, da, do, etc
      return capitalize(word);
    })
    .join(' ');
};