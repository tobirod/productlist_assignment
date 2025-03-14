--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Debian 17.4-1.pgdg120+2)
-- Dumped by pg_dump version 17.4 (Debian 17.4-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: category; Type: TABLE; Schema: public; Owner: tobrod
--

CREATE TABLE public.category (
    id bigint NOT NULL,
    display_name character varying(255),
    slug character varying(255)
);


ALTER TABLE public.category OWNER TO tobrod;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: tobrod
--

ALTER TABLE public.category ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: tobrod
--

COPY public.category (id, display_name, slug) FROM stdin;
1	Beauty	beauty
2	Fragrances	fragrances
3	Furniture	furniture
4	Groceries	groceries
5	Home Decoration	home-decoration
6	Kitchen Accessories	kitchen-accessories
7	Laptops	laptops
8	Mens Shirts	mens-shirts
9	Mens Shoes	mens-shoes
10	Mens Watches	mens-watches
11	Mobile Accessories	mobile-accessories
12	Motorcycle	motorcycle
13	Skin Care	skin-care
14	Smartphones	smartphones
15	Sports Accessories	sports-accessories
16	Sunglasses	sunglasses
17	Tablets	tablets
18	Tops	tops
19	Vehicle	vehicle
20	Womens Bags	womens-bags
21	Womens Dresses	womens-dresses
22	Womens Jewellery	womens-jewellery
23	Womens Shoes	womens-shoes
24	Womens Watches	womens-watches
\.


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tobrod
--

SELECT pg_catalog.setval('public.category_id_seq', 24, true);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: tobrod
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

