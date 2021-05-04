// Source: https://undraw.co/

import Education from 'assets/svg/education.svg';
import EverydayLife from 'assets/svg/everyday-life.svg';
import DroneSurveillance from 'assets/svg/drone-surveillance.svg';
import GiftBox from 'assets/svg/gift-box.svg';
import HavingFun from 'assets/svg/having-fun.svg';
import Journey from 'assets/svg/journey.svg';
import Medicine from 'assets/svg/medicine.svg';
import Payments from 'assets/svg/payments.svg';
import ProfileData from 'assets/svg/profile-data.svg';
import Savings from 'assets/svg/savings.svg';
import SmartHome from 'assets/svg/smart-home.svg';
import Subway from 'assets/svg/subway.svg';
import SweetHome from 'assets/svg/sweet-home.svg';

export const getCategoryIcon = icon => {
  switch (icon) {
    case 'airplane':
      return Journey;
    case 'car':
      return ProfileData;
    case 'cash':
      return Savings;
    case 'credit-card-outline':
      return Payments;
    case 'file-document':
      return SmartHome;
    case 'food-apple':
      return EverydayLife;
    case 'gamepad-square':
      return HavingFun;
    case 'gift':
      return GiftBox;
    case 'home':
      return SweetHome;
    case 'medical-bag':
      return Medicine;
    case 'school':
      return Education;
    case 'shopping':
      return DroneSurveillance;
    case 'train':
      return Subway;
    default:
      return null;
  }
};
