import { digitsFaToEn } from '@persian-tools/persian-tools';

export const getBmi = (unit: string, weight: any, height: any) => {
  let bmi: number | string = '';
  let obj = {};

  if (unit === 'LBS') {
    const currentWeight = Number(digitsFaToEn(weight).slice(0, 3)) / 2.20462;
    bmi = Number(currentWeight / ((Number(height) * Number(height)) / 10000));

    if (Boolean(weight)) {
      if (bmi <= 18) {
        return (obj = {
          value: Math.round(bmi),
          icon: 'https://matchafit.world/files/landingpics/warn.png',
          description:
            "Concentrati su tonificare i muscoli e su una dieta equilibrata. Sii positivo e cerca di mantenere il consumo calorico quotidiano nell'intervallo raccomandato.",
          title: `Il tuo IMC è ${Math.round(bmi)}, che è considerato sottopeso`,
          status: 'underweight',
        });
      } else if (bmi > 18 && bmi <= 25) {
        return (obj = {
          value: Math.round(bmi),
          icon: 'https://matchafit.world/files/landingpics/ok-hand.png',
          description:
            'Stai facendo un buon lavoro mantenendo il tuo peso nella norma. Useremo il tuo indice per creare un programma su misura in base alle tue esigenze.',
          title: `Il tuo IMC è ${Math.round(bmi)}, che è considerato normale`,
          status: 'normal',
        });
      } else if (bmi > 18 && bmi <= 30) {
        return (obj = {
          value: Math.round(bmi),
          icon: 'https://matchafit.world/files/landingpics/warn.png',
          description:
            'Dovresti cercare di concentrarti sul tuo peso. Useremo il tuo indice per creare un programma di perdita di peso su misura.',
          title: `Il tuo IMC è ${Math.round(bmi)}, che è considerato obeso`,
          status: 'overweight',
        });
      } else if (bmi > 30) {
        return (obj = {
          value: Math.round(bmi),
          icon: 'https://matchafit.world/files/landingpics/warn.png',
          description:
            'Dovresti cercare di concentrarti sul tuo peso. Useremo il tuo indice per creare un programma di perdita di peso su misura.',
          title: `Il tuo IMC è ${Math.round(bmi)}, che è considerato obeso`,
          status: 'overweight',
        });
      }
    } else {
      return null;
    }
  }

  if (unit.includes('KG')) {
    bmi = Number(digitsFaToEn(weight).slice(0, 3)) / ((Number(height) * Number(height)) / 10000);

    if (Boolean(weight)) {
      if (bmi <= 18) {
        return (obj = {
          value: Math.round(bmi),
          icon: 'https://matchafit.world/files/landingpics/warn.png',
          description:
            'بر تقویت عضلات و رژیم غذایی متعادل تمرکز کن. به سبک زندگی سالم ادامه بده و سعی کن مصرف کالری روزانه رو در محدوده توصیه شده نگه داری.',
          title: ` شاخص BMIت ${Math.round(bmi)} هستش و در محدوده کمبود وزن قرار داری.`,
          status: 'underweight',
        });
      } else if (bmi > 18 && bmi <= 25) {
        return (obj = {
          value: Math.round(bmi),
          icon: 'https://matchafit.world/files/landingpics/ok-hand.png',
          description: 'وضعیت تناسب اندام خوبی داری و وقتشه حرفه‌ای تر کار کنی تا به اندام ایده‌آل تری برسی.',
          title: ` شاخص BMIت ${Math.round(bmi)}  هستش و در محدوده نرمال قرار داری.`,
          status: 'normal',
        });
      } else if (bmi > 18 && bmi <= 30) {
        return (obj = {
          value: Math.round(bmi),
          icon: 'https://matchafit.world/files/landingpics/warn.png',
          description:
            'باید بر روی کاهش وزن اصولی تمرکز کنی. هوش مصنوعی ماچا از این شاخص برای طراحی برنامه کاهش وزن تخصصی مخصوص خودت استفاده میکنه.',
          title: ` شاخص BMIت ${Math.round(bmi)}  هستش و در محدوده اضافه وزن قرار داری.`,
          status: 'overweight',
        });
      } else if (bmi > 30) {
        return (obj = {
          icon: 'https://matchafit.world/files/landingpics/warn.png',
          value: Math.round(bmi),
          description:
            'باید بر روی کاهش وزن اصولی تمرکز کنی. هوش مصنوعی ماچا از این شاخص برای طراحی برنامه کاهش وزن تخصصی مخصوص خودت استفاده میکنه.',
          title: ` شاخص BMIت ${Math.round(bmi)}  هستش و در محدوده اضافه وزن قرار داری.`,
          status: 'overweight',
        });
      }
    } else {
      return null;
    }
  }
};
