import { useTranslation } from "react-i18next";
import { Button, Grid } from "@mantine/core";
import { AffixBtn } from "../Common/AffixBtn";
import { useCopyUrl } from "../../hooks/useCopyUrl";
import { useViewportSize } from "@mantine/hooks";

export function PropertyPanelActions({
  marketplaceLink,
  address,
  onClose,
}: {
  marketplaceLink: string;
  address: string;
  onClose: () => void;
}) {
  const { width } = useViewportSize();
  const { t } = useTranslation('common');
  const { copied, onCopyUrl } = useCopyUrl();

  return (
    <Grid className="px-4">
      <Grid.Col span={{
        base: 6,
        md: 4,
      }}>
        <Button
          variant="default"
          fullWidth
          component="a"
          title={t('title.viewOnRealT')}
          target="_blank"
          referrerPolicy="no-referrer"
          href={marketplaceLink}>
          RealT
        </Button>
      </Grid.Col>
      <Grid.Col span={{
        base: 6,
        md: 4,
      }}>
        <Button
          variant="default"
          fullWidth
          component="a"
          title={t('title.viewOnRealtoken')}
          target="_blank"
          referrerPolicy="no-referrer"
          href={"https://dashboard.realtoken.community/asset/" + address}>
          Dashboard
        </Button>
      </Grid.Col>
      <Grid.Col span={{
        base: 0,
        md: 4,
      }}>
        <AffixBtn
          defaultToPlain
          leftSection={
            <Button
              color={copied ? 'teal' : ''}
              variant="light"
              title={t('title.copyUrl')}
              onClick={onCopyUrl}>
              {t('actions.copyUrl')}
            </Button>
          }>
          <Button
            fullWidth={width > 768}
            onClick={onClose}>
            {t('actions.close')}
          </Button>
        </AffixBtn>
      </Grid.Col>
    </Grid>
  )
}
