import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import WatchIcon from "@mui/icons-material/Watch";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ChairIcon from "@mui/icons-material/Chair";
import MotorcycleIcon from "@mui/icons-material/TwoWheeler";
import SportsIcon from "@mui/icons-material/SportsSoccer";
import SunglassesIcon from "@mui/icons-material/RemoveRedEye";
import DiamondIcon from "@mui/icons-material/Diamond";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DressIcon from "@mui/icons-material/Checkroom";
import SpaIcon from '@mui/icons-material/Spa';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import BlenderIcon from '@mui/icons-material/Blender';
import TabletIcon from '@mui/icons-material/Tablet';
import RollerSkatingIcon from '@mui/icons-material/RollerSkating';

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case "beauty":
      return <SpaIcon sx={{ fontSize: 20 }} />;
    case "fragrances":
      return <LocalFloristIcon sx={{ fontSize: 20 }} />;
    case "furniture":
      return <ChairIcon sx={{ fontSize: 20 }} />;
    case "groceries":
      return <LocalGroceryStoreIcon sx={{ fontSize: 20 }} />;
    case "home-decoration":
      return <WorkspacesIcon sx={{ fontSize: 20 }} />;
    case "kitchen-accessories":
      return <BlenderIcon sx={{ fontSize: 20 }} />;
    case "laptops":
      return <LaptopMacIcon sx={{ fontSize: 20 }} />;
    case "mens-shirts":
      return <DressIcon sx={{ fontSize: 20 }} />;
    case "mens-shoes":
      return <RollerSkatingIcon sx={{ fontSize: 20 }} />;
    case "mens-watches":
      return <WatchIcon sx={{ fontSize: 20 }} />;
    case "mobile-accessories":
      return <DevicesOtherIcon sx={{ fontSize: 20 }} />;
    case "motorcycle":
      return <MotorcycleIcon sx={{ fontSize: 20 }} />;
    case "skin-care":
      return <SpaIcon sx={{ fontSize: 20 }} />;
    case "smartphones":
      return <PhoneIphoneIcon sx={{ fontSize: 20 }} />;
    case "sports-accessories":
      return <SportsIcon sx={{ fontSize: 20 }} />;
    case "sunglasses":
      return <SunglassesIcon sx={{ fontSize: 20 }} />;
    case "tablets":
      return <TabletIcon sx={{ fontSize: 20 }} />;
    case "tops":
      return <DressIcon sx={{ fontSize: 20 }} />;
    case "vehicle":
      return <DirectionsCarIcon sx={{ fontSize: 20 }} />;
    case "womens-bags":
      return <ShoppingBagIcon sx={{ fontSize: 20 }} />;
    case "womens-dresses":
      return <DressIcon sx={{ fontSize: 20 }} />;
    case "womens-jewellery":
      return <DiamondIcon sx={{ fontSize: 20 }} />;
    case "womens-shoes":
      return <RollerSkatingIcon sx={{ fontSize: 20 }} />;
    case "womens-watches":
      return <WatchIcon sx={{ fontSize: 20 }} />;
    default:
      return <LocalGroceryStoreIcon sx={{ fontSize: 20 }} />;
  }
};
