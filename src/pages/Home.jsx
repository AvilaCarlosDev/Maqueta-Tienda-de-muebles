import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const WHATSAPP_URL = "https://wa.me/584120000000";

const tokens = {
  bg: "#f6f0e7",
  surface: "#fffaf3",
  alt: "#ebe0d2",
  ink: "#181411",
  muted: "#6d6258",
  primary: "#7a4f34",
  primaryHover: "#5b3725",
  accent: "#d7a66f",
  moss: "#5d6b55",
  border: "rgba(24,20,17,.11)",
};

const services = [
  {
    title: "Venta de muebles",
    copy: "Salas, comedores, butacas, sillas, mesas y piezas listas para transformar hogares reales.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=90&fit=crop",
  },
  {
    title: "Fabricación a medida",
    copy: "Muebles creados según medidas, distribución, estilo, telas, uso diario y presupuesto.",
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1200&q=90&fit=crop",
  },
  {
    title: "Reparación de muebles",
    copy: "Refuerzo de estructuras, cambio de espuma, ajustes, costura y recuperación de piezas gastadas.",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=1200&q=90&fit=crop",
  },
  {
    title: "Tapicería moderna",
    copy: "Reemplazo de tapicería vieja por telas actuales para salas, sillas, butacas y comedores.",
    image: "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=1200&q=90&fit=crop",
  },
  {
    title: "Cojines decorativos",
    copy: "Cojines personalizados por tamaño, tela, color y estilo para salas, camas y espacios comerciales.",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=1200&q=90&fit=crop",
  },
  {
    title: "Bolsos textiles",
    copy: "Bolsos y accesorios de tela con confección resistente, acabados limpios y estilo artesanal.",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1200&q=90&fit=crop",
  },
];

const transformations = [
  ["01", "Evaluamos", "Foto, medidas, estado del mueble y objetivo visual."],
  ["02", "Proponemos", "Telas, espuma, colores, acabados y presupuesto."],
  ["03", "Fabricamos", "Corte, costura, tapizado, refuerzo y detalles finales."],
  ["04", "Entregamos", "Pieza lista para volver a usarse y verse moderna."],
];

const rooms = [
  {
    title: "Salas",
    copy: "Muebles modulares, sofás familiares, butacas y tapicería para zonas de descanso.",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&q=90&fit=crop",
  },
  {
    title: "Dormitorios",
    copy: "Cabeceras, bancos, cojines, baúles tapizados y piezas textiles para habitaciones.",
    image: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=1200&q=90&fit=crop",
  },
  {
    title: "Comedores",
    copy: "Sillas retapizadas, mesas renovadas y conjuntos preparados para uso diario.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=90&fit=crop",
  },
];

const featured = [
  ["Sala modular", "Fabricación a medida", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=90&fit=crop"],
  ["Comedor renovado", "Tapicería + acabado", "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=900&q=90&fit=crop"],
  ["Set de cojines", "Textil personalizado", "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=900&q=90&fit=crop"],
];

function Home() {
  return (
    <Box sx={{ bgcolor: tokens.bg, color: tokens.ink, overflow: "hidden" }}>
      <Header />

      <Box component="main">
        <Hero />
        <Services />
        <Transformation />
        <Rooms />
        <Featured />
        <FinalCta />
      </Box>

      <Footer />
    </Box>
  );
}

function Header() {
  return (
    <Box component="header" sx={{ position: "sticky", top: 0, zIndex: 50, bgcolor: "rgba(246,240,231,.88)", backdropFilter: "blur(18px)", borderBottom: `1px solid ${tokens.border}` }}>
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" sx={{ height: 82 }} spacing={3}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box sx={{ width: 48, height: 48, borderRadius: "50%", bgcolor: tokens.ink, color: tokens.accent, display: "grid", placeItems: "center", fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 900 }}>A</Box>
            <Box>
              <Typography sx={{ fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 900, lineHeight: 1 }}>Atelier Aruma</Typography>
              <Typography sx={{ fontSize: 10, fontWeight: 900, letterSpacing: ".2em", textTransform: "uppercase", color: tokens.muted }}>Muebles & tapicería</Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={4} sx={{ display: { xs: "none", md: "flex" }, ml: "auto" }}>
            {["Servicios", "Proceso", "Ambientes", "Piezas"].map((item) => (
              <Typography key={item} component="a" href={`#${item.toLowerCase()}`} sx={{ textDecoration: "none", color: tokens.muted, fontWeight: 800, fontSize: 14, "&:hover": { color: tokens.primary } }}>{item}</Typography>
            ))}
          </Stack>

          <Button href={WHATSAPP_URL} variant="contained" sx={{ ml: "auto", bgcolor: tokens.primary, px: 3, py: 1.25, "&:hover": { bgcolor: tokens.primaryHover }, display: { xs: "none", sm: "inline-flex" } }}>
            Cotizar
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

function Hero() {
  return (
    <Box sx={{ position: "relative", py: { xs: 8, md: 12 }, minHeight: { md: "calc(100vh - 82px)" }, display: "flex", alignItems: "center" }}>
      <Box sx={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 78% 18%, rgba(215,166,111,.32), transparent 30%), radial-gradient(circle at 10% 90%, rgba(93,107,85,.18), transparent 32%)` }} />
      <Container maxWidth="xl" sx={{ position: "relative" }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Chip label="Venta · fabricación · reparación · tapicería" sx={{ mb: 3, bgcolor: tokens.surface, color: tokens.primary, fontWeight: 900, letterSpacing: ".08em" }} />
            <Typography component="h1" sx={{ maxWidth: 780, fontFamily: "Georgia, serif", fontSize: { xs: "4rem", md: "7.4rem" }, lineHeight: .82, letterSpacing: "-.075em", fontWeight: 900 }}>
              Diseñamos muebles con segunda vida
            </Typography>
            <Typography sx={{ mt: 4, maxWidth: 650, color: tokens.muted, fontSize: { xs: 17, md: 20 }, lineHeight: 1.75 }}>
              Venta de muebles, fabricación a medida, reparación, tapicería moderna, cojines y bolsos textiles. Todo con estética premium, materiales durables y asesoría directa por WhatsApp.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 5 }}>
              <Button href="#servicios" variant="contained" size="large" sx={{ bgcolor: tokens.ink, px: 4, py: 1.7, "&:hover": { bgcolor: tokens.primary } }}>Ver servicios</Button>
              <Button href={WHATSAPP_URL} variant="outlined" size="large" sx={{ borderColor: tokens.primary, color: tokens.primary, px: 4, py: 1.7, "&:hover": { bgcolor: tokens.surface, borderColor: tokens.ink } }}>Cotizar por WhatsApp</Button>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: "grid", gridTemplateColumns: "1.05fr .75fr", gap: 2.2, alignItems: "end" }}>
              <Box component="img" src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1300&q=90&fit=crop" alt="Sala premium" sx={{ width: "100%", height: { xs: 430, md: 640 }, objectFit: "cover", borderRadius: "999px 999px 36px 36px", boxShadow: "0 34px 90px rgba(24,20,17,.18)" }} />
              <Stack spacing={2.2}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 5, bgcolor: tokens.ink, color: "white" }}>
                  <Typography sx={{ color: tokens.accent, fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: ".16em" }}>Especialidad</Typography>
                  <Typography sx={{ mt: 1.5, fontSize: { xs: 25, md: 32 }, fontWeight: 900, lineHeight: .98 }}>Tapicería vieja, look nuevo</Typography>
                  <Typography sx={{ mt: 1.5, color: "rgba(255,255,255,.62)", lineHeight: 1.65 }}>Telas modernas, espuma nueva y costura reforzada.</Typography>
                </Paper>
                <Box component="img" src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800&q=90&fit=crop" alt="Tapicero trabajando" sx={{ width: "100%", height: { xs: 190, md: 260 }, objectFit: "cover", borderRadius: 5 }} />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function Services() {
  return (
    <Container id="servicios" maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
      <SectionTitle eyebrow="Servicios" title="Un taller completo, no solo una tienda" text="La propuesta cubre compra, fabricación, reparación y textiles. Cada servicio tiene su propia imagen y mensaje." />
      <Grid container spacing={3}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.title}>
            <Card sx={{ height: "100%", borderRadius: 6, overflow: "hidden", boxShadow: "none", bgcolor: tokens.surface, border: `1px solid ${tokens.border}` }}>
              <CardMedia component="img" height="300" image={service.image} alt={service.title} sx={{ objectFit: "cover" }} />
              <CardContent sx={{ p: 3.5 }}>
                <Typography sx={{ fontSize: 26, fontWeight: 900, lineHeight: 1.05 }}>{service.title}</Typography>
                <Typography sx={{ mt: 1.5, color: tokens.muted, lineHeight: 1.7 }}>{service.copy}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

function Transformation() {
  return (
    <Box id="proceso" sx={{ bgcolor: tokens.ink, color: "white", py: { xs: 8, md: 12 } }}>
      <Container maxWidth="xl">
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={5}>
            <Box component="img" src="https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=1200&q=90&fit=crop" alt="Renovación de tapicería" sx={{ width: "100%", height: { xs: 380, md: 620 }, objectFit: "cover", borderRadius: 7 }} />
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography sx={{ color: tokens.accent, fontWeight: 900, letterSpacing: ".18em", textTransform: "uppercase", fontSize: 13 }}>Proceso premium</Typography>
            <Typography sx={{ mt: 2, maxWidth: 760, fontFamily: "Georgia, serif", fontSize: { xs: 48, md: 82 }, lineHeight: .86, letterSpacing: "-.07em", fontWeight: 900 }}>Del mueble usado a una pieza renovada</Typography>
            <Grid container spacing={2.5} sx={{ mt: 5 }}>
              {transformations.map(([num, title, text]) => (
                <Grid item xs={12} sm={6} key={num}>
                  <Box sx={{ p: 3, borderRadius: 4, border: "1px solid rgba(255,255,255,.12)", bgcolor: "rgba(255,255,255,.04)" }}>
                    <Typography sx={{ color: tokens.accent, fontWeight: 900 }}>{num}</Typography>
                    <Typography sx={{ mt: 1, fontSize: 22, fontWeight: 900 }}>{title}</Typography>
                    <Typography sx={{ mt: 1, color: "rgba(255,255,255,.62)", lineHeight: 1.7 }}>{text}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function Rooms() {
  return (
    <Box id="ambientes" sx={{ bgcolor: tokens.surface, py: { xs: 8, md: 12 } }}>
      <Container maxWidth="xl">
        <SectionTitle eyebrow="Ambientes" title="Visuales correctos para cada categoría" text="Salas, dormitorios y comedores se muestran con imágenes acordes para que la oferta se entienda al instante." />
        <Grid container spacing={3}>
          {rooms.map((room) => (
            <Grid item xs={12} md={4} key={room.title}>
              <Card sx={{ borderRadius: 7, overflow: "hidden", boxShadow: "none", bgcolor: tokens.bg }}>
                <CardMedia component="img" height="420" image={room.image} alt={room.title} sx={{ objectFit: "cover" }} />
                <CardContent sx={{ p: 4 }}>
                  <Typography sx={{ fontSize: 34, fontWeight: 900, lineHeight: 1 }}>{room.title}</Typography>
                  <Typography sx={{ mt: 1.5, color: tokens.muted, lineHeight: 1.7 }}>{room.copy}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function Featured() {
  return (
    <Container id="piezas" maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
      <SectionTitle eyebrow="Piezas" title="Lo que puede venderse o cotizarse" text="Una vitrina corta, realista y flexible para productos físicos y servicios personalizados." />
      <Grid container spacing={3}>
        {featured.map(([title, type, image]) => (
          <Grid item xs={12} md={4} key={title}>
            <Card sx={{ borderRadius: 6, overflow: "hidden", boxShadow: "none", bgcolor: tokens.surface, border: `1px solid ${tokens.border}` }}>
              <CardMedia component="img" height="360" image={image} alt={title} sx={{ objectFit: "cover" }} />
              <CardContent sx={{ p: 3.5 }}>
                <Chip label={type} sx={{ bgcolor: tokens.alt, color: tokens.primary, fontWeight: 900 }} />
                <Typography sx={{ mt: 2, fontSize: 30, fontWeight: 900, lineHeight: 1 }}>{title}</Typography>
                <Button href={WHATSAPP_URL} fullWidth sx={{ mt: 3, bgcolor: tokens.ink, color: "white", py: 1.4, "&:hover": { bgcolor: tokens.primary } }}>Cotizar</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

function FinalCta() {
  return (
    <Box sx={{ px: 2, py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Paper elevation={0} sx={{ textAlign: "center", p: { xs: 4, md: 8 }, borderRadius: 8, bgcolor: tokens.alt, border: `1px solid ${tokens.border}` }}>
          <Typography sx={{ color: tokens.primary, fontWeight: 900, letterSpacing: ".18em", textTransform: "uppercase", fontSize: 13 }}>Cotización personalizada</Typography>
          <Typography sx={{ mt: 2, mx: "auto", maxWidth: 840, fontFamily: "Georgia, serif", fontSize: { xs: 46, md: 78 }, lineHeight: .86, fontWeight: 900, letterSpacing: "-.07em" }}>¿Quieres fabricar, reparar o cambiar tapicería?</Typography>
          <Typography sx={{ mt: 3, mx: "auto", maxWidth: 680, color: tokens.muted, lineHeight: 1.8 }}>Envía fotos, medidas aproximadas y la idea que tienes. Te respondemos con opciones, telas y presupuesto.</Typography>
          <Button href={WHATSAPP_URL} size="large" sx={{ mt: 4, bgcolor: tokens.primary, color: "white", px: 5, py: 1.7, "&:hover": { bgcolor: tokens.ink } }}>Cotizar por WhatsApp</Button>
        </Paper>
      </Container>
    </Box>
  );
}

function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: tokens.ink, color: "white", py: 6 }}>
      <Container maxWidth="xl">
        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" spacing={3}>
          <Box>
            <Typography sx={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 900 }}>Atelier Aruma</Typography>
            <Typography sx={{ mt: 1, color: "rgba(255,255,255,.55)" }}>Muebles, fabricación, reparación, cojines, bolsos y tapicería moderna.</Typography>
          </Box>
          <Typography sx={{ color: "rgba(255,255,255,.45)", fontWeight: 800 }}>Demo creada por Carlos Avila 🇻🇪</Typography>
        </Stack>
      </Container>
    </Box>
  );
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ md: "end" }} spacing={3} sx={{ mb: 6 }}>
      <Box>
        <Typography sx={{ color: tokens.primary, fontWeight: 900, letterSpacing: ".18em", textTransform: "uppercase", fontSize: 13 }}>{eyebrow}</Typography>
        <Typography sx={{ mt: 1, maxWidth: 860, fontFamily: "Georgia, serif", fontSize: { xs: 48, md: 82 }, lineHeight: .86, letterSpacing: "-.07em", fontWeight: 900 }}>{title}</Typography>
      </Box>
      <Typography sx={{ maxWidth: 470, color: tokens.muted, lineHeight: 1.8 }}>{text}</Typography>
    </Stack>
  );
}

export default Home;
