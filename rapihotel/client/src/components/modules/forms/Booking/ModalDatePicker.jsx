import React, { useEffect, useState, useCallback } from "react";
import {
  DateRangePicker,
  Card,
  CardBody,
  Button,
  RangeCalendar,
} from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { Icon } from "@iconify/react";

export default function HotelBooking({ onClose, setCheckin, setCheckout }) {
  const [dateRange, setDateRange] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const formatter = useDateFormatter({ dateStyle: "long" });

  // Función para calcular las noches
  const calculateNights = useCallback(() => {
    if (!dateRange?.start || !dateRange?.end) return 0;
    return Math.ceil(
      (dateRange.end.toDate(getLocalTimeZone()).getTime() -
        dateRange.start.toDate(getLocalTimeZone()).getTime()) /
        (1000 * 60 * 60 * 24)
    );
  }, [dateRange]);

  const todayDate = today(getLocalTimeZone());

  // Manejar cambios en el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Define cuántos meses se muestran en el picker según el tamaño de la pantalla
  const visibleMonths = windowWidth > 768 ? 2 : 1;

  return (
    <div className="fixed inset-0 flex min-h-screen items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div
        className="absolute inset-0 m-8 text-xl cursor-pointer"
        onClick={() => onClose()}
      >
        <Icon icon="lucide:x" className="text-text-alt" width={24} height={24} />
      </div>

      <Card className=" w-full sm:w-auto flex justify-center h-auto bg-background shadow-lg rounded-lg border border-default-200 py-6">
        <CardBody className="gap-4">
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-xl font-semibold">Check-in y Check-out</h2>
          </div>
          <RangeCalendar
            showMonthAndYearPickers
            aria-label="Date (Show Month and Year Picker)"
            value={dateRange}
            defaultValue={null}
            onChange={setDateRange}
            className="w-full"
            minValue={todayDate}
            visibleMonths={visibleMonths}
            weekdayStyles="long"
            calendarWidth={'auto'}
            lang="es-CO"
            
          />
          <div className="flex items-start gap-3 mt-2 p-3 bg-default-50 rounded-lg">
            <Icon
              icon={
                dateRange?.start && dateRange?.end
                  ? "lucide:calendar-check"
                  : "lucide:calendar"
              }
              className="text-primary mt-1"
            />
            {dateRange?.start && dateRange?.end ? (
              <div className="text-sm">
                <p className="text-default-700 font-medium">
                  {formatter.formatRange(
                    dateRange.start.toDate(getLocalTimeZone()),
                    dateRange.end.toDate(getLocalTimeZone())
                  )}
                </p>
                <p className="text-default-500">{calculateNights()} noches</p>
              </div>
            ) : (
              <p className="text-default-500">Selecciona tus fechas</p>
            )}
          </div>
          <Button
            variant="solid"
            color="primary"
            className="w-full mt-4"
            onPress={() => {
              setCheckin(dateRange.start.toDate(getLocalTimeZone()));
              setCheckout(dateRange.end.toDate(getLocalTimeZone()));
              onClose();
            }}
            isDisabled={!dateRange?.start || !dateRange?.end}
          >
            Aceptar
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
