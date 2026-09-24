CREATE TABLE users (
    id SERIAL PRIMARY KEY,

    full_name VARCHAR(100) NOT NULL,

    email VARCHAR(100) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    wallet_address VARCHAR(255),

    role VARCHAR(20) DEFAULT 'user',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- PROPERTIES
-- =========================================

CREATE TABLE IF NOT EXISTS properties (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image TEXT,
    total_value VARCHAR(100),
    token_price NUMERIC(12,2) NOT NULL,
    roi NUMERIC(5,2) NOT NULL,
    funding NUMERIC(5,2) NOT NULL,
    trust_score NUMERIC(5,2),
    available_tokens INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- SAMPLE PROPERTIES
-- =========================================

INSERT INTO properties
(title, location, category, image, total_value, token_price, roi, funding, trust_score, available_tokens)
VALUES

(
    'Chandrayan Heights',
    'Surat, Gujarat',
    'Residential',
    '/src/assets/images/chandrayanHeights.jpg',
    '₹12.5 Cr',
    550,
    12,
    82,
    96,
    225000
),

(
    'Skyline Business Park',
    'Ahmedabad, Gujarat',
    'Commercial',
    '/src/assets/images/skylinebusinesspark.jpg',
    '₹22 Cr',
    600,
    11,
    67,
    91,
    290400
),

(
    'Palm Residency',
    'Mumbai, Maharashtra',
    'Residential',
    '/src/assets/images/palmresidency.png',
    '₹30 Cr',
    500,
    19,
    91,
    94,
    90000
),

(
    'Green Valley Villas',
    'Pune, Maharashtra',
    'Residential',
    '/src/assets/images/greenvalleyvillas.png',
    '₹20 Cr',
    650,
    12,
    58,
    97,
    210000
),

(
    'Marina Bay Towers',
    'Kochi, Kerala',
    'Residential',
    '/src/assets/images/marinabaytowers.png',
    '₹27 Cr',
    500,
    15,
    76,
    98,
    129600
),

(
    'Tech Square Business Hub',
    'Bengaluru, Karnataka',
    'Commercial',
    '/src/assets/images/techSquareBusinessHub.jpg',
    '₹30 Cr',
    600,
    11,
    95,
    99,
    25000
),

(
    'Orchid Residency',
    'Hyderabad, Telangana',
    'Residential',
    '/src/assets/images/orchidResidency.jpg',
    '₹35 Cr',
    650,
    8,
    41,
    99,
    295000
),

(
    'Riverfront Plaza',
    'Ahmedabad, Gujarat',
    'Residential',
    '/src/assets/images/riverfrontPlaza.jpg',
    '₹20 Cr',
    580,
    18,
    88,
    99,
    30000
);