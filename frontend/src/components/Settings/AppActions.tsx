import { useDisclosure } from '@mantine/hooks';
import { Flex } from '@mantine/core';
import { AppActionsButton } from './AppActionsButton';
import { StartTooltip } from './StartTooltip';
import { AffixBtn } from '../Common/AffixBtn';
import { MapOptionsPanel } from './Settings/SettingsPanel';
import { WalletsPanel } from './Wallets/WalletsPanel';
import WalletIcon from '@mui/icons-material/Wallet';
import SettingsIcon from '@mui/icons-material/Settings';
import LinkIcon from '@mui/icons-material/Link';
import CheckIcon from '@mui/icons-material/Check';
import { useCopyUrl } from '../../hooks/useCopyUrl';
import { useTranslation } from 'react-i18next';

export function AppActions() {
  const { t } = useTranslation('common');
  const { copied, onCopyUrl } = useCopyUrl();

  const [walletsOpened, {
    open: openWallets,
    close: closeWallets,
  }] = useDisclosure(false);

  const [mapOptionsOpened, {
    open: openMapOptions,
    close: closeMapOptions,
  }] = useDisclosure(false);

  function onOpenWallets() {
    openWallets();
    closeMapOptions();
  }

  function onOpenMapOptions() {
    openMapOptions();
    closeWallets();
  }

  return (
    <>
      <WalletsPanel opened={walletsOpened} close={closeWallets} />
      <MapOptionsPanel opened={mapOptionsOpened} close={closeMapOptions} />
      {
        !mapOptionsOpened && !walletsOpened &&
        <AffixBtn>
          <Flex align="end" className="ml-2 sm:ml-0">
            <AppActionsButton opened={false} open={onCopyUrl} label={t('actions.copyUrl')} color={copied ? 'teal' : ''}>
              {
                !copied
                  ? <LinkIcon fontSize="large" />
                  : <CheckIcon fontSize="large" />
              }
            </AppActionsButton>
            <StartTooltip />
            <AppActionsButton opened={false} open={onOpenWallets} label={t('actions.openWalletsPanel')}>
              <WalletIcon fontSize="large" />
            </AppActionsButton>
            <AppActionsButton opened={false} open={onOpenMapOptions} label={t('actions.openSettingsPanel')}>
              <SettingsIcon fontSize="large" />
            </AppActionsButton>
          </Flex>
        </AffixBtn>
      }
    </>
  )
}